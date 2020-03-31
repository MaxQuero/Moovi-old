import {FaHeart, FaStar} from "react-icons/fa";
import React, {Component} from "react";
import {MovieInterface} from "../../dto/movie.interface";

interface State {
    favorite: MovieInterface;
}

export default class Actions extends Component<State> {
    constructor(props: any) {
        super(props);
        this.state = {
            favorite: this.props
        };

    }

    //binded
    addFav = (() => {
    });


    render() {
        const stars = [];
        for (let i = 0; i < 10; i++) {
            stars.push(<FaStar className="fa-star" key={i} />);
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
