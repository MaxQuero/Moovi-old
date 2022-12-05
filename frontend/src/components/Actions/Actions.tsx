import React, {useEffect, useState} from 'react';
import Stars from '../Stars/Stars';
import './Actions.scss';
import Favorite from '../Favorite/Favorite';
import WatchlistButton from '../WatchlistButton/WatchlistButton';
import {
    Movie,
    TvShow,
    useMutateFavoriteMediaMutation,
    useMutateRateMediaMutation,
    useMutateWatchlistMediaMutation, useRatingUpdatedSubscription
} from '../../generated/graphql';
import {useApolloClient} from "@apollo/client";

interface Props {
    media: Movie | TvShow;
}

function Actions({media}: Props) {
    const session: string = localStorage.getItem('user');
    const sessionId: string = JSON.parse(session).sessionId;
    const accountId: number = JSON.parse(session).id;
    const client = useApolloClient();
    const serializedState = client.cache.extract();
    const [mediaUpdated, setMediaUpdated] = useState(media)

    const [setRateMedia, {
        data: {rateMedia: mediaRated = {}} = {},
        loading: loadingRate
    }] = useMutateRateMediaMutation();
    const [setFavoriteMedia, {
        data: {favoriteMedia: mediaFavorite = {}} = {},
        loading: loadingFavorite
    }] = useMutateFavoriteMediaMutation();
    const [setWatchlistMedia, {
        data: {watchlistMedia: mediaWatchlisted = {}} = {},
        loading: laodingWathclisted
    }] = useMutateWatchlistMediaMutation();

    useEffect(() => {
        setMediaUpdated({
            ...media,
            rating: mediaRated.rating || media.rating,
            favorite: mediaFavorite.favorite || media.favorite,
            watchlist: mediaWatchlisted.watchlist || media.watchlist
        })
    }, [media, mediaRated.rating, mediaFavorite.isFavorite, mediaWatchlisted.isWatchlisted])

    return (
        <div className="actions-wrapper">
            <Stars
                starsToDisplay={10}
                rating={mediaUpdated.rating}
                ratingFunc={(rating: number) => setRateMedia({
                    variables: {
                        media: {id: mediaUpdated.id, type: mediaUpdated.type, rating: rating},
                        sessionId: sessionId
                    }
                })}
            />
            <Favorite className="actions-wrapper__favorite"
                      setMovieToFavoriteFunc={(isFavorite: boolean) =>
                          setFavoriteMedia({
                                  variables: {
                                      media: {id: mediaUpdated.id, type: mediaUpdated.type, favorite: isFavorite},
                                      accountId: accountId,
                                      sessionId: sessionId
                                  }
                              }
                          )}
                      media={mediaUpdated}/>
            <WatchlistButton
                className="actions-wrapper__watchlist"
                setMediaToWatchlistFunc={(isWatchlisted: boolean) =>
                    setWatchlistMedia({
                        variables: {
                            media: {id: mediaUpdated.id, type: mediaUpdated.type, watchlist: isWatchlisted},
                            accountId: accountId,
                            sessionId: sessionId
                        }
                    })}
                media={mediaUpdated}
            />
        </div>
    );
}

export default Actions;
