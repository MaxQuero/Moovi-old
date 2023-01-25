import React, {useEffect} from 'react';
import {Login} from '../../guards/Auth/Auth';
import './Watchlist.scss';
import {
    formatDate,
} from '../../helpers/Helpers';
import Favorite from '../../components/Favorite/Favorite';
import Trash from '../../components/Trash/Trash';
import Stars from '../../components/Stars/Stars';
import {v4 as uuidv4} from 'uuid';
import Media from '../../components/Media/Media';
import {MediaEnum} from '../../interfaces/Media.interface';
import ToggleButton from '../../components/ToggleButton/ToggleButton';
import {Movie, TvShow} from "../../generated/graphql";
import {gql} from "@apollo/client";
import {useWatchlist} from "./Watchlist.hook";

function Watchlist() {
    const {
        var: {session, sessionId, accountId},
        state: {watchlistMedias, watchlistMode},
        actions: {getMediasWatchlist, setFavoriteMedia, setRateMedia, setWatchlistMode, deleteMediaFromWatchlist}
    } = useWatchlist()


    useEffect(() => {
        if (session) {
            getMediasWatchlist({variables: {mediaType: MediaEnum.Movie, accountId, sessionId, page: 1}});
        } else {
            Login().then();
        }
    }, []);

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

    return (
        <div className="watchlist">
            <h1 className="watchlist__title">Ma watchlist</h1>
            <div className="watchlist__tabs">
                {<ToggleButton
                    config={[MediaEnum.Movie, MediaEnum.Tv]}
                    selectedItem={watchlistMode}
                    setElementsFilteredFunc={filterWatchlist}
                >
                    {watchlistMedias?.length > 0 &&
                        watchlistMedias.map((media: Movie | TvShow) => (
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
