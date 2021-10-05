import Moment from "moment";
import {favMovie, rateMovie, setToWatchlist} from "./ApiCalls";
import {useDispatch} from "react-redux";
import {MovieInterface} from "../components/Movie/Movie.interface";

export const formatDate: any = (date: any, format: string) => {
    return (Moment(date).format(format));
};

export const rateMovieAction = (async (movie: MovieInterface, rating: number, dispatch: any) => {
    const session: string | null = localStorage.getItem('user');
    if (session) {
        const sessionId: string = JSON.parse(session).sessionId;
        const oldMovie = movie;

        try {
            const status  = await rateMovie(rating, movie, sessionId);
            dispatch(
                {
                    type: "UPDATE_RATING",
                    payload: {
                        movieId: movie.id,
                        rating: rating
                    }
                })
            return status;
        }
        catch(err) {
            dispatch(
                {
                    type: "UPDATE_RATING",
                    payload: oldMovie
                });
            console.log('err', err);
            throw new Error(err.message);
        }
    }
});

export const setMovieToFavoritesAction = (async (movie: MovieInterface, isFavorite: boolean, dispatch:any) => {
    const session: string | null = localStorage.getItem('user');
    if (session) {
        const sessionId: string = JSON.parse(session).sessionId;
        const accountId: number = JSON.parse(session).id;
        const oldMovie = movie;

        try {
            const status  = await favMovie(accountId, sessionId,'movie', movie, isFavorite);
            dispatch(
                {
                    type: "UPDATE_FAVORITES",
                    payload: {
                        movieId: movie.id,
                        favorite: isFavorite
                    }
                })
            return status;
        }
        catch(err) {
            dispatch(
                {
                    type: "UPDATE_FAVORITES",
                    payload: oldMovie
                });
            console.log('err', err);
            throw new Error(err.message);
        }
    }
});

export const setMovieToWatchListAction= async (movie: MovieInterface, isWatchlisted: boolean, dispatch:any) => {
    const session: string | null = localStorage.getItem('user');
    if (session) {
        const sessionId: string = JSON.parse(session).sessionId;
        const accountId: number = JSON.parse(session).id;
        const oldMovie = movie;

        try {
            console.log('isWatchlisted', isWatchlisted);
            const status  = await setToWatchlist(accountId, sessionId, 'movie', movie, isWatchlisted);
            dispatch(
                {
                    type: "UPDATE_WATCHLIST",
                    payload: {
                        movieId: movie.id,
                        watchlist: isWatchlisted
                    }
                })
            return status;
        }
        catch(err) {
            dispatch(
                {
                    type: "UPDATE_WATCHLIST",
                    payload: oldMovie
                });
            throw new Error(err.message);
        }
    }

}

