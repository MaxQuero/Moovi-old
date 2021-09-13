import React, {useEffect, useState} from 'react';
import {MovieInterface} from "../../components/Movie/Movie.interface";
import './Home.scss';
import Movie from "../../components/Movie/Movie";
import {Login} from "../../guards/Auth/Auth";
import {v4 as uuidv4} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {getPopularMoviesList} from "../../redux/moviesReducer";

interface Props {
}

interface State {
    session: any;
    movies: MovieInterface[];
}


function Home(props: Props) {
    const dispatch = useDispatch();
    const movies = useSelector((state: any) => state.moviesReducer.popularMovies);

    useEffect(() => {
            if (!localStorage.getItem('user')) {
                Login().then();
            } else {
                dispatch(getPopularMoviesList());
            }
        }
    , []);

    return (
        <section className="movie-list section">
            <div className="container">
                { movies && movies.map((movie: MovieInterface) => (
                    <Movie movie={movie} key={uuidv4()} />
                ))}
            </div>
        </section>
    );
}

export default Home;