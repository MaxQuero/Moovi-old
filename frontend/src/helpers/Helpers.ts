import Moment from "moment";
import {MovieInterface} from "../interfaces/Movie.interface";
import {TvShowInterface} from "../interfaces/TvShow.interface";
import {
    favMedia,
    getMediaDetailsFromId,
    getMediaSeasonDetailsFromMediaId,
    getMediaWatchlist,
    getOnTheAirMedias,
    getPopularMedias,
    getTrendingMedias,
    getUpcomingMedias,
    rateMedia,
    setMediaToWatchlist
} from "./MediaApiCalls";
import {MediaEnum} from "../interfaces/Media.interface";

export const formatDate: any = (date: any, format: string) => {
    return (Moment(date).format(format));
};

export const rateMediaAction = (async (media: MovieInterface | TvShowInterface, rating: number, dispatch: any) => {
    const session: string | null = localStorage.getItem('user');
    if (session) {
        const sessionId: string = JSON.parse(session).sessionId;
        const oldMedia = media;
        try {
            const status = await rateMedia(rating, media, sessionId);

            dispatch({
                type: "UPDATE_MEDIA_RATING",
                payload: {
                    media: {...media, rating: rating},
                    type: media.type
                }
            });

            return status;
        } catch (err) {

            dispatch({
                type: "UPDATE_MEDIA_RATING",
                payload: {
                    media: oldMedia,
                    type: media.type
                }
            });


            console.log('err', err);
            throw new Error(err.message);
        }
    }
});

export const setMediaToFavoritesAction = (async (media: MovieInterface | TvShowInterface, isFavorite: boolean, dispatch: any) => {
    const session: string | null = localStorage.getItem('user');
    if (session) {
        const sessionId: string = JSON.parse(session).sessionId;
        const accountId: number = JSON.parse(session).id;
        const oldMedia = media;

        try {
            const status = await favMedia(media, isFavorite, accountId, sessionId);

            dispatch({
                type: "UPDATE_MEDIA_FAVORITE",
                payload: {
                    media: {...media, favorite: isFavorite},
                    type: media.type
                }
            })
            return status;
        } catch (err) {

            dispatch({
                type: "UPDATE_MEDIA_FAVORITE",
                payload: {
                    media: oldMedia,
                    type: media.type
                }
            })

            console.log('err', err);
            throw new Error(err.message);
        }
    }
});


export const setMediaToWatchListAction = async (media: MovieInterface | TvShowInterface, isWatchlisted: boolean, dispatch: any) => {
    const session: string | null = localStorage.getItem('user');

    if (session) {
        const sessionId: string = JSON.parse(session).sessionId;
        const accountId: number = JSON.parse(session).id;
        const oldMedia = media;
        try {
            const status = await setMediaToWatchlist(media, isWatchlisted, accountId, sessionId);

            dispatch(
                {
                type: "UPDATE_MEDIA_WATCHLIST",
                payload: {
                    media: {...media, watchlist: isWatchlisted},
                    type: media.type
                }
            })
            return status;
        } catch (err) {
            dispatch({
                type: "UPDATE_MEDIA_WATCHLIST",
                payload: {
                    media: oldMedia,
                    type: media.type
                }
            });

            throw new Error(err.message);
        }
    }

}


export const getPopularMediasList = (mediaType: MediaEnum) => async (dispatch: any) => {
    dispatch({
        type: "TOGGLE_LOADING",
        payload: {
            field: 'popularMedias'
        }
    });

    const medias = await getPopularMedias(mediaType);


    dispatch({
        type: "GET_POPULAR_MEDIAS",
        payload: {
            medias: medias,
            type: mediaType
        }
    });
}

export const getOnTheAirMediasList = (mediaType: MediaEnum) => async (dispatch: any) => {
    try {

        dispatch({
            type: "TOGGLE_LOADING",
            payload: {
                field: 'onTheAirMedias'
            }
        });

        const medias = await getOnTheAirMedias(mediaType);

        dispatch({
            type: "GET_ON_THE_AIR_MEDIAS",
            payload: {
                medias: medias,
                type: mediaType
            }
        });
    } catch (err) {
        console.error(err.message);
    }
}

export const getLatestMediasList = (mediaType: MediaEnum) => async (dispatch: any) => {

    try {
        dispatch({
            type: "TOGGLE_LOADING",
            payload: {
                field: 'latestMedias'
            }
        });

        const medias = await getUpcomingMedias(mediaType);

        dispatch({
            type: "GET_LATEST_MEDIAS",
            payload: {
                medias: medias,
                type: mediaType
            }
        });
    } catch (err) {
        console.error(err.message);
    }
}

export const getTrendingMediasList = (mediaType: MediaEnum) => async (dispatch: any) => {

    try {
        dispatch({
            type: "TOGGLE_LOADING",
            payload: {
                field: 'trendingMedias'
            }
        });

        const medias = await getTrendingMedias(mediaType);

        dispatch({
            type: "GET_TRENDING_MEDIAS",
            payload: {
                medias: medias,
                type: mediaType
            }
        });
    } catch (err) {
        console.error(err.message);
    }
}

export const getMediaDetails: any = (mediaId: string, mediaType: MediaEnum, sessionId?: string) => async (dispatch: any) => {
    try {
        dispatch({
            type: "TOGGLE_LOADING",
            payload: {
                field: 'mediaDetails'
            }
        });

        const media = await getMediaDetailsFromId(mediaId, mediaType, sessionId);

        dispatch({
            type: "GET_MEDIA",
            payload: {
                media: media,
                type: media.type
            }
        });

        return media
    } catch (err) {
        console.error(err.message);
    }
}

export const getMediaSeasonDetails: any = (mediaId: number, seasonNumber: number, sessionId?: string)  => async (dispatch: any) => {
     dispatch({
            type: "TOGGLE_LOADING",
            payload: {
                field: 'seasons'
            }
        });

        const seasonDetails = await getMediaSeasonDetailsFromMediaId(mediaId, seasonNumber, sessionId);

        dispatch({
                type: "GET_MEDIA_SEASON_DETAILS",
                payload: {
                    season: seasonDetails
                }
            });

        return seasonDetails
 }

export const getMediasWatchlist = (mediaType: MediaEnum, accountId: number, sessionId: string, page = 1) => async (dispatch: any) => {
    const watchlist = await getMediaWatchlist(mediaType, accountId, sessionId, page);

    dispatch({
        type: "GET_MEDIAS_WATCHLIST",
        payload: {
            medias: watchlist,
            type: mediaType
        }
    });
}

export const deepCopy = (value: any) => {
    return JSON.parse(JSON.stringify(value));
}
