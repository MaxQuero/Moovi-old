import {FaHeart} from "react-icons/fa";
import React from "react";
import "./Favorite.scss";
import {MovieInterface} from "../Movie/Movie.interface";

interface Props {
    setMovieToFavoriteFunc: any
    movie: MovieInterface,
    rounded?: boolean,
    className?: string
}

function Favorite(props: Props) {
    let classNames = "favorite";
    classNames += props.movie.favorite ? " active" : "";
    classNames += props.rounded ? " rounded" : "";
    classNames += " " + props.className || '';
    return (
        <div className={classNames} onClick={(e) => {
            e.stopPropagation(); props.setMovieToFavoriteFunc(props.movie, !props.movie.favorite)}
        }>
            <FaHeart className="fa-heart" />
        </div>
    );
};

export default Favorite