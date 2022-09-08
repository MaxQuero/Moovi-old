import React from "react";
import "./Trash.scss";
import {MovieInterface} from "../../interfaces/Movie.interface";
import {TvShowInterface} from "../../interfaces/TvShow.interface";
import {FaTrash} from "react-icons/all";

interface Props {
    deleteMovieFromWatchlistFunc: any
    media: MovieInterface | TvShowInterface,
    rounded?: boolean,
    className?: string
}

function Trash(props: Props) {
    let classNames = "trash";
    classNames += props.media.watchlist ? " active" : "";
    classNames += props.rounded ? " rounded" : "";
    classNames += " " + props.className || '';
    return (
        <div className={classNames} role="presentation" onClick={(e) => {
            e.stopPropagation(); props.deleteMovieFromWatchlistFunc(props.media, false)}
        }>
            <FaTrash className="fa-trash" />
        </div>
    );
};

export default Trash