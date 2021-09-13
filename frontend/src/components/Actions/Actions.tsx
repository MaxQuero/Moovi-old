import {FaHeart, FaStar} from "react-icons/fa";
import React, {Component, useEffect, useState} from "react";
import {MovieInterface} from "../Movie/Movie.interface";
import {rateMovie} from "../../helpers/ApiCalls";
import Stars from "../Stars/Stars";
import "./Actions.scss";

interface Props {
    movie: MovieInterface;
}

function Actions(props: Props) {
    const [movie, setMovie] = useState(props.movie);

    const addFav = (() => {

    });

    const rateMovieAction = ((note: number) => {
            const session: string | null = localStorage.getItem('user');
            if (session) {
                const sessionId: string = JSON.parse(session).sessionId;
                rateMovie(props.movie, note, sessionId).then(
                    (rate) => {
                        return rate;
                    }
                );
            }
        });

    return (
        <div className="actions-wrapper">
            <div className="star-wrapper">
                <Stars rating={4} rateMovie={rateMovieAction}/>
            </div>
            <FaHeart className="fa-heart" onClick={addFav}/>
        </div>
    );
}

export default Actions;