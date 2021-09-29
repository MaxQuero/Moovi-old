import {FaHeart, FaTasks} from "react-icons/fa";
import React from "react";
import {MovieInterface} from "../Movie/Movie.interface";
import {favMovie, rateMovie, setToWatchlist} from "../../helpers/ApiCalls";
import Stars from "../Stars/Stars";
import "./Actions.scss";
import {useDispatch} from "react-redux";

interface Props {
    movie: MovieInterface;
}

function Actions(props: Props) {
    const dispatch = useDispatch();


    console.log('movie', props.movie);

    const rateMovieAction = (async (rating: number) => {
            const session: string | null = localStorage.getItem('user');
            if (session) {
                const sessionId: string = JSON.parse(session).sessionId;
                const oldMovie = props.movie;

                try {
                    const status  = await rateMovie(rating, props.movie, sessionId);
                    dispatch(
                        {
                            type: "UPDATE_RATING",
                            payload: {
                                movieId: props.movie.id,
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

    const setMovieToFavoritesAction = (async () => {
        const session: string | null = localStorage.getItem('user');
        if (session) {
            const sessionId: string = JSON.parse(session).sessionId;
            const accountId: number = JSON.parse(session).id;
            const oldMovie = props.movie;

            try {
                const status  = await favMovie(accountId, sessionId,'movie', props.movie, !props.movie.favorite);
                dispatch(
                    {
                        type: "UPDATE_FAVORITES",
                        payload: {
                            movieId: props.movie.id,
                            favorite: !props.movie.favorite
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

    const setMovieToWatchList = async () => {
        const session: string | null = localStorage.getItem('user');
        if (session) {
            const sessionId: string = JSON.parse(session).sessionId;
            const accountId: number = JSON.parse(session).id;
            const oldMovie = props.movie;

            try {
                const status  = await setToWatchlist(accountId, sessionId, 'movie', props.movie, !props.movie.watchlist);
                dispatch(
                    {
                        type: "UPDATE_WATCHLIST",
                        payload: {
                            movie: props.movie,
                            watchlist: !props.movie.watchlist
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
    return (
        <div className="actions-wrapper">
            <div className="star-wrapper">
                <Stars rating={props.movie.rating} rateMovie={rateMovieAction}/>
            </div>
            <FaHeart className={props.movie.favorite ? "fa-heart active" : "fa-heart"}  onClick={(e) => {e.stopPropagation(); setMovieToFavoritesAction()}}/>

            <FaTasks className={props.movie.watchlist ? "fa-tasks active" : "fa-tasks"} onClick={(e) => {e.stopPropagation(); setMovieToWatchList()}} />
        </div>
    );
}

export default Actions;