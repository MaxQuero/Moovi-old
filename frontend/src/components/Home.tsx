import React from 'react';
import {MovieInterface} from "../dto/movie.interface";

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
        const fetchMovies = async (): Promise<any> => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/movie/list`);
            const json = await response.json();
            this.setState({movies: json});
        };
        fetchMovies().then((res) => {
            console.log(this.state);
        });
    }

    render() {
            return <section className="movie-list section">
            <div className="container">
                <div className="row">
                    { this.state.movies && this.state.movies.map((movie: MovieInterface) => (
                        <div className="col-lg-4 col-md-6" key={movie.id}>
                            <div className="card h-100">
                                <img src={movie.cover} alt={movie.title}/>
                                <div className="title">{movie.title}</div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    }
}
