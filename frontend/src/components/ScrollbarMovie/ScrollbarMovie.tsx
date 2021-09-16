import React from "react";
import "./ScrollbarMovie.scss";
import {MovieInterface} from "../Movie/Movie.interface";
import ScrollbarHorizontal from "../ScrollbarHorizontal/ScrollbarHorizontal";
import Movie from "../Movie/Movie";
import {v4 as uuid} from "uuid";

interface Props {
    movies: MovieInterface[]
}

function ScrollbarMovie(props:Props) {
    return (
        <div className="scrollbar-movie">
            <ScrollbarHorizontal>
                {props.movies && props.movies.map((movie: MovieInterface) =>
                        <Movie key={uuid()} movie={movie} />
                    )
                }
            </ScrollbarHorizontal>
        </div>
    )
}

export default ScrollbarMovie;