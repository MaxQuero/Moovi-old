import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMovieDetails} from "../../redux/moviesReducer";
import {useParams} from "react-router";
import Backdrop from "../../components/Backdrop/Backdrop";
import "./MovieDetails.scss";
import Moment from "moment";
import 'moment/locale/fr';
import Casting from "../../components/Casting/Casting";
import {MovieInterface} from "../../components/Movie/Movie.interface";
import ScrollbarMovie from "../../components/ScrollbarMovie/ScrollbarMovie";
Moment.locale('fr');


function MovieDetails() {
    const dispatch = useDispatch();
    const movieId: any = useParams();
    const movie: MovieInterface = useSelector((state: any )=> state.moviesReducer.movieDetails);
    console.log('init details');
    useEffect(() => {
        console.log('gett detaillls');
        const session: string | null = localStorage.getItem('user');
        if (session) {
            const sessionId: string = JSON.parse(session).sessionId;
            dispatch(getMovieDetails(movieId.id, sessionId));
            console.log('get movie details');
        } else {
            dispatch(getMovieDetails(movieId.id));
        }
    }, []);

    return (
        <>
            {
                movie && <div className="movie-details">
                    <Backdrop movie={movie} />
                    <div className="movie-details__content">
                        <Casting cast={movie.actors} crew={movie.directors} />
                        <div className="movie-details__recommendations">
                            <span className="movie-details__recommendations__title"> Recommandations </span>
                            <ScrollbarMovie movies={movie.recommendations}></ScrollbarMovie>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default MovieDetails;