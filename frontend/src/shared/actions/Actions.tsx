import {FaHeart, FaStar} from "react-icons/fa";
import React, {Component} from "react";
import {MovieInterface} from "../../dto/movie.interface";
import {rateMovie} from "../../helpers/api_call";

interface Props {
    movie: MovieInterface;
}

interface State {
    movie: MovieInterface;
}

export default class Actions extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            movie: this.props.movie
        };

    }

    //binded
    addFav = (() => {

    });

    rateMovieAction = ((movie: MovieInterface, note: number) =>
        (event: any) => {
        const session: string | null = localStorage.getItem('user');
            if (session) {
                const sessionId: string = JSON.parse(session).sessionId;
                rateMovie(movie, note, sessionId).then(
                    (rate) => {
                        return rate;
                    }
                );
            }
    });

    render() {
        const stars = [];
        for (let i = 0; i < 10; i++) {
            //we will display stars on reverse order for css, so real note needs to be calculated
            const note = Math.abs(i-10);
            stars.push(<FaStar className="fa-star" key={i} onClick={this.rateMovieAction(this.props.movie, note)} />);
        }

        return (
            <div className="actions-wrapper">
                <div className="star-wrapper">
                    {stars}
                </div>
                <FaHeart className="fa-heart" onClick={this.addFav}/>
            </div>
        );
    }

}
