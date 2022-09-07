import React from "react";
import Stars from "../Stars/Stars";
import "./Actions.scss";
import {useDispatch} from "react-redux";
import Favorite from "../Favorite/Favorite";
import {setMediaToFavoritesAction, rateMediaAction, setMediaToWatchListAction} from "../../helpers/Helpers";
import WatchlistButton from "../WatchlistButton/WatchlistButton";
import {TvShowInterface} from "../../interfaces/TvShow.interface";
import {MovieInterface} from "../../interfaces/Movie.interface";

interface Props {
    media: MovieInterface | TvShowInterface;
}

function Actions(props: Props) {
    const dispatch = useDispatch();

    const rateMedia = (async (media: MovieInterface | TvShowInterface, rating: number) => {
        await rateMediaAction(props.media, rating, dispatch);
    });

    const setMediaToFavorites= (async (media: MovieInterface | TvShowInterface, isFavorite: boolean) => {
        await setMediaToFavoritesAction(media, isFavorite, dispatch);
    });

    const setMediaToWatchlist = (async(media: MovieInterface | TvShowInterface, isWatchlisted: boolean) => {
        await setMediaToWatchListAction(media, isWatchlisted, dispatch);
    });



    return (
        <div className="actions-wrapper">
            <Stars starsToDisplay={10} media={props.media} rateMediaFunc={rateMedia}/>
            <Favorite className="actions-wrapper__favorite"  setMovieToFavoriteFunc={setMediaToFavorites} media={props.media} />
            <WatchlistButton className="actions-wrapper__watchlist"  setMediaToWatchlistFunc={setMediaToWatchlist} media={props.media} />
        </div>
    );
}

export default Actions;