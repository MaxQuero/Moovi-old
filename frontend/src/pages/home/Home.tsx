import React from 'react';
import {MovieInterface} from "../../dto/movie.interface";
import './home.scss';
import Movie from "../../components/movie/Movie";
import {Login} from "../../guards/auth/Auth";
import {Redirect} from "react-router";
import {AppConstants} from "../../app.constants";
import {getUser} from "../../helpers/api_call";

interface Props {
}

interface State {
    login: any;
    movies: MovieInterface[];
}



export default class Home extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            login: null,
            movies: []
        };

        const getMovies = async (): Promise<any> => {
            const response = await fetch(`${AppConstants.FRONT_URL}/movie/list`);
           /* const json = await response.json();
            this.setState({movies: json});*/
        };
        getMovies().then((res) => {
        });



        Login().then();

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
