import React, {useEffect, useState} from 'react';
import {MovieInterface} from "../../components/Movie/movie.interface";
import './home.scss';
import Movie from "../../components/Movie/Movie";
import {Login} from "../../guards/Auth/Auth";
import {getMovies} from "../../helpers/api_call";
import {v4 as uuidv4} from "uuid";

interface Props {
}

interface State {
    session: any;
    movies: MovieInterface[];
}


function Home(props: Props) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
            if (!localStorage.getItem('user')) {
                Login().then();
            } else {
                getMovies().then(
                    (movies) => {
                        setMovies(movies);
                    }
                );

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