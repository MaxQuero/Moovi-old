import React from 'react';
import {MovieInterface} from "../../dto/movie.interface";
import './home.scss';
import Movie from "../../components/movie/Movie";
import {Login} from "../../guards/auth/Auth";
import {getMovies} from "../../helpers/api_call";

interface Props {
}

interface State {
    session: any;
    movies: MovieInterface[];
}



export default class Home extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            session: null,
            movies: []
        };

        if (!localStorage.getItem('user')) {
            Login().then();
        } else {
            getMovies().then(
                (movies) => {
                    this.setState({movies: movies});
                }
            );

        }
    }

    render() {
        return (
            <section className="movie-list section">

                <div className="container">
                    { this.state.movies && this.state.movies.map((movie: MovieInterface) => (
                        <Movie movie={movie} key={movie.id} />
                    ))}
                </div>
            </section>
        );
    }
}
