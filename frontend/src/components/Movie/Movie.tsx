import React from "react";
import './Movie.scss';
import Actions from "../Actions/Actions";
import {Redirect, useHistory} from "react-router-dom";
import {MovieInterface} from "./movie.interface";

interface Props {
    movie: MovieInterface;
}

function Movie(props: Props){
    const history = useHistory();
    /**
     * Redirect to movie details page
     */
    const goToMovieDetailsPage = ((movieId: string) => {
        history.push ("/movie/${movieId}/details");
    });

    /*if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
    } else {*/
    return (
        <div className="card movie">
            <div className="cover-wrapper" onClick={() => goToMovieDetailsPage(props.movie.id)}>
                <img className="cover" src={props.movie.cover} alt={props.movie.title}/>
                <div className="global-note">{props.movie.voteAverage}</div>
                <Actions movie={props.movie}/>
            </div>
            <div className="title">{props.movie.title}</div>
        </div>
    );
}

export default Movie;