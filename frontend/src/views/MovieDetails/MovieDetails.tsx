import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMovieDetails} from "../../redux/moviesReducer";
import {useParams} from "react-router";
import Backdrop from "../../components/Backdrop/Backdrop";
import "./MovieDetails.scss";
import Moment from "moment";
import 'moment/locale/fr';
import Casting from "../../components/Casting/Casting";
import {MovieInterface} from "../../components/Movie/Movie.interface";

Moment.locale('fr');

function MovieDetails() {
    const dispatch = useDispatch();
    const movieId: any = useParams();
    const movie: MovieInterface = useSelector((state: any )=> state.moviesReducer.movieDetails);


    useEffect(() => {
        dispatch(getMovieDetails(movieId.id));
    }, []);



    return (
        <>
            {movie &&
            <div className="movie-details">
                <Backdrop movie={movie} />
                <Casting cast={movie.actors} crew={movie.directors} />
                <></>
            </div>

            }
        </>
    )
}

export default MovieDetails;