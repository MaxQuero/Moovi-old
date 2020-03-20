import React from "react";
import {MovieInterface} from "../../dto/movie.interface";
import { FaHeart, FaStar} from 'react-icons/fa';
import './movie.scss';
import Actions from "../../shared/actions/Actions";

interface Props {
    movie: MovieInterface;
}

export default class Movie extends React.Component<Props> {
    render() {
        return (
            <div className="card movie">
                <div className="cover-wrapper">
                    <img className="cover" src={this.props.movie.cover} alt={this.props.movie.title} />
                    <div className="global-note">{ this.props.movie.voteAverage }</div>
                    <Actions  favorite={this.props.movie}/>
                </div>
                <div className="title">{this.props.movie.title}</div>
            </div>
        );
    }
}
