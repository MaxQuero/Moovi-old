import React from "react";
import {MovieInterface} from "../../components/Movie/movie.interface";
import {useHistory} from "react-router/index";

interface Props {
    movie: MovieInterface;
}

function MovieDetails(props: Props) {

    const history = useHistory();

    const goToMovieDetailsPage = ((movieId: string) => {
        history.push( `/movie/${movieId}/details`);
    });

    return (
        <div className="card movie">
            <p>Detail du film {props.movie.id}</p>
        </div>
    );

}

export default MovieDetails;


