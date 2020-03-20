import React from 'react';
import {MovieInterface} from "../../dto/movie.interface";
import './home.scss';
import Movie from "../../components/movie/Movie";
import ts from "typescript/lib/tsserverlibrary";

interface Props {
}

interface State {
    movies: MovieInterface[];
}

export default class Home extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            movies: []
        };
        const getMovies = async (): Promise<any> => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/movie/list`);
            const json = await response.json();
            this.setState({movies: json});
        };
        getMovies().then((res) => {
            console.log(this.state);
        });
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
