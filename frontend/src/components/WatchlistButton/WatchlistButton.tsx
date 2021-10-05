import {FaTasks} from "react-icons/fa";
import React from "react";
import "./WatchlistButton.scss";
import {MovieInterface} from "../Movie/Movie.interface";

interface Props {
    setMovieToWatchlistFunc: any
    movie: MovieInterface
}

function WatchlistButton(props: Props) {
    return (
        <FaTasks className={props.movie.watchlist ? "fa-tasks active" : "fa-tasks"} onClick={(e) => {e.stopPropagation(); props.setMovieToWatchlistFunc(props.movie, !props.movie.watchlist)}} />
    );
}

export default WatchlistButton