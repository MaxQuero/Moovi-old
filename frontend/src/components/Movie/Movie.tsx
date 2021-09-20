import React from "react";
import './Movie.scss';
import Actions from "../Actions/Actions";
import {useHistory} from "react-router-dom";
import {MovieInterface} from "./Movie.interface";

interface Props {
    movie: MovieInterface;
    getTheme?: any;
}

function Movie(props: Props){
    const history = useHistory();
    /**
     * Redirect to movie details page
     */
    const goToMovieDetailsPage = ((movieId: number) => {
        history.push (`/movie/${movieId}`);
    });


    return (
        <div className="movie">
            <div className="poster-wrapper" onClick={() => goToMovieDetailsPage(props.movie.id)}>
                <img className="poster"
                     crossOrigin="anonymous"
                     src={props.movie.poster}
                     alt={props.movie.title}/>
                <div className="global-note">{props.movie.voteAverage}</div>
                <Actions movie={props.movie}/>
            </div>
        </div>
    );
}

export default Movie;