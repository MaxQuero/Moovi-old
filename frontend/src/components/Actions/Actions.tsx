import {FaHeart, FaTasks} from "react-icons/fa";
import React from "react";
import {MovieInterface} from "../Movie/Movie.interface";
import {favMovie, rateMovie, setToWatchlist} from "../../helpers/ApiCalls";
import Stars from "../Stars/Stars";
import "./Actions.scss";
import {useDispatch} from "react-redux";
import Favorite from "../Favorite/Favorite";
import {setMovieToFavoritesAction, rateMovieAction, setMovieToWatchListAction} from "../../helpers/Helpers";
import WatchlistButton from "../WatchlistButton/WatchlistButton";

interface Props {
    movie: MovieInterface;
}

function Actions(props: Props) {
    const dispatch = useDispatch();

    const rateMovie = (async (movie: MovieInterface, rating: number) => {
        await rateMovieAction(props.movie, rating, dispatch);
    });

    const setMovieToFavorites= (async (movie: MovieInterface, isFavorite: boolean) => {
        await setMovieToFavoritesAction(props.movie, isFavorite, dispatch);
    });

    const setMovieToWatchlist = (async(movie: MovieInterface, isWatchlisted: boolean) => {
        await setMovieToWatchListAction(props.movie, isWatchlisted, dispatch);
    });



    return (
        <div className="actions-wrapper">
            <Stars movie={props.movie} rateMovieFunc={rateMovie}/>
            <Favorite setMovieToFavoriteFunc={setMovieToFavorites} movie={props.movie} />
            <WatchlistButton setMovieToWatchlistFunc={setMovieToWatchlist} movie={props.movie} />
        </div>

    );
}

export default Actions;