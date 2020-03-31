import React from 'react';
import {MovieInterface} from "../../dto/movie.interface";
import './home.scss';
import Movie from "../../components/movie/Movie";
import {Login} from "../../guards/auth/Auth";
import {Redirect} from "react-router";

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
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/movie/list`);
            const json = await response.json();
            this.setState({movies: json});
        };
        getMovies().then((res) => {
        });

        Login().then(
            (res) => {
                //this.setState({login: "https://www.themoviedb.org/authenticate/" + res + "?redirect_to=" + window.location.origin.toString()});

            }
        )
    }

    render() {
        return (
            <section className="movie-list section">
                {  this.state.login && window.location.replace(this.state.login) }

                { console.log(this.state.login) }

                <div className="container">
                    { this.state.movies && this.state.movies.map((movie: MovieInterface) => (
                        <Movie movie={movie} key={movie.id} />
                    ))}
                </div>
            </section>
        );
    }
}
