import {FaHeart} from "react-icons/fa";
import React from "react";
import "./Favorite.scss";
import {MovieInterface} from "../../interfaces/Movie.interface";
import {TvShowInterface} from "../../interfaces/TvShow.interface";

interface Props {
    setMovieToFavoriteFunc: (media: TvShowInterface | MovieInterface, favorite: boolean) => void,
    media: MovieInterface | TvShowInterface,
    rounded?: boolean,
    className?: string
}

function Favorite(props: Props) {
    let classNames = "favorite";
    classNames += props.media.favorite ? " active" : "";
    classNames += props.rounded ? " rounded" : "";
    classNames += " " + props.className || '';
    return (
        <div className={classNames} role='presentation' onClick={(e) => {
            e.stopPropagation(); props.setMovieToFavoriteFunc(props.media, !props.media.favorite)}
        }>
            <FaHeart className="fa-heart" />
        </div>
    );
};

export default Favorite