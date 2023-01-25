import React, {useEffect} from 'react';
import Stars from '../Stars/Stars';
import './Actions.scss';
import Favorite from '../Favorite/Favorite';
import WatchlistButton from '../WatchlistButton/WatchlistButton';
import {
    Movie,
    TvShow,
} from '../../generated/graphql';
import {useActions} from "./Actions.hook";

interface Props {
    media: Movie | TvShow;
}

function Actions({media}: Props) {
    const {
        var: { accountId, sessionId },
        state: { mediaUpdated, mediaRated, mediaWatchlisted, mediaFavorite },
        actions: { setRateMedia, setWatchlistMedia, setFavoriteMedia, setMediaUpdated }
    } = useActions(media)

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
