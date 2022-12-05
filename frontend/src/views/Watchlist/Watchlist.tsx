import React, {useEffect, useState} from 'react';
import {Login} from '../../guards/Auth/Auth';
import './Watchlist.scss';
import {
    formatDate, getMediasWatchlist,
} from '../../helpers/Helpers';
import Favorite from '../../components/Favorite/Favorite';
import Trash from '../../components/Trash/Trash';
import Stars from '../../components/Stars/Stars';
import {v4 as uuidv4} from 'uuid';
import Media from '../../components/Media/Media';
import {MediaEnum} from '../../interfaces/Media.interface';
import ToggleButton from '../../components/ToggleButton/ToggleButton';
import {
    Movie,
    TvShow,
    useGetWatchlistMediasLazyQuery, useMutateFavoriteMediaMutation,
    useMutateRateMediaMutation,
    useMutateWatchlistMediaMutation
} from "../../generated/graphql";
import test from "node:test";
import {gql} from "@apollo/client";

function Watchlist() {
    const session: string = localStorage.getItem('user');
    const sessionId: string = JSON.parse(session).sessionId;
    const accountId: number = JSON.parse(session).id;

    const [getMediasWatchlist, {
        data: {watchlistMedias = []} = {},
        loading: loadingMediasWatchlist
    }] = useGetWatchlistMediasLazyQuery()
    const [setRateMedia, {data: mediasRated, loading: loadingRate}] = useMutateRateMediaMutation();
    const [setFavoriteMedia, {data: mediasFavorites, loading: loadingFavorite}] = useMutateFavoriteMediaMutation();
    const [setWatchlistMedia, {
        data: mediasWatchlisted,
        loading: loadingWatchlisted
    }] = useMutateWatchlistMediaMutation();

    const [watchlistMode, setWatchlistMode] = useState(MediaEnum.Movie);
    const [mediasToWatch, setMediasToWatch] = useState(watchlistMedias)
    useEffect(() => {

        if (session) {
            getMediasWatchlist({variables: {mediaType: MediaEnum.Movie, accountId, sessionId, page: 1}});
        } else {
            Login().then();
        }
    }, []);


    useEffect(() => {
        setMediasToWatch(watchlistMedias)
    }, [watchlistMedias])

    const filterWatchlist = (typeToFilter: MediaEnum) => {
        getMediasWatchlist({
            variables: {
                mediaType: typeToFilter,
                accountId,
                sessionId,
                page: 1
            }
        })
        setWatchlistMode(typeToFilter)
    }

    const deleteMediaFromWatchlist = (media: Movie | TvShow, isWatchlisted: boolean) =>
    {
        setWatchlistMedia({
            update(cache, data) {

                const fragment: any = cache.readFragment({
                        id: `${data?.data?.watchlistMedia.type}:${data?.data?.watchlistMedia.id}`,
                        fragment: gql`
                            fragment UptdatedCache on Movie {
                                id
                            }
                        `
                    }
                )
                cache.updateFragment( { fragment }, (datae) => {
                    return {watchlistMedias: [...datae.watchlistMedia.slice(datae)]}
                    }
                )
            },
            variables: {
                media: {
                    id: media.id,
                    type: media.type,
                    watchlist: isWatchlisted
                }, accountId: accountId, sessionId: sessionId
            }
        })
        const updatedWatchlist = mediasToWatch.filter(el => el.id !== media.id)
        setMediasToWatch(updatedWatchlist)
    }
    return (
        <div className="watchlist">
            <h1 className="watchlist__title">Ma watchlist</h1>
            <div className="watchlist__tabs">
                {<ToggleButton
                    config={[MediaEnum.Movie, MediaEnum.Tv]}
                    selectedItem={watchlistMode}
                    setElementsFilteredFunc={filterWatchlist}
                >
                    {mediasToWatch?.length > 0 &&
                        mediasToWatch.map((media: Movie | TvShow) => (
                            <div className="watchlist__item media-item" key={uuidv4()}>
                                <Media className="media-item__media" media={media}/>
                                <div className="media-item__desc">
                                    <p className="media-item__title">{media.title}</p>
                                    <p className="media-item__release">{formatDate(media.releaseDate, 'd MMMM YYYY')}</p>
                                    <p className="media-item__synopsis">{media.synopsis}</p>
                                    <div className="media-item__actions">
                                        <Favorite
                                            className="media-item__favorite"
                                            rounded
                                            setMovieToFavoriteFunc={(isFavorite: boolean) => setFavoriteMedia({
                                                variables: {
                                                    media: {
                                                        id: media.id,
                                                        type: media.type,
                                                        favorite: isFavorite
                                                    },
                                                    accountId: accountId,
                                                    sessionId: sessionId
                                                }
                                            })}
                                            media={media}
                                        />
                                        <Trash
                                            rounded
                                            deleteMovieFromWatchlistFunc={deleteMediaFromWatchlist}
                                            media={media}
                                            className="media-item__watchlist"
                                        />
                                        <Stars starsToDisplay={10}
                                               reversed
                                               ratingFunc={(rating: number) => setRateMedia({
                                                   variables: {
                                                       media: {
                                                           id: media.id,
                                                           type: media.type,
                                                           rating: rating
                                                       }, sessionId: sessionId
                                                   }
                                               })}
                                               rating={media?.rating}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                </ToggleButton>}
            </div>
        </div>
    );
}

export default Watchlist;
