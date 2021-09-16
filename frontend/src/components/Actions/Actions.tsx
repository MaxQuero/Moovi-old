import {FaHeart} from "react-icons/fa";
import React from "react";
import {MovieInterface} from "../Movie/Movie.interface";
import {rateMovie} from "../../helpers/ApiCalls";
import Stars from "../Stars/Stars";
import "./Actions.scss";
import {useDispatch} from "react-redux";

interface Props {
    movie: MovieInterface;
}

function Actions(props: Props) {
    const dispatch = useDispatch();

    const addFav = (() => {

    });

    const rateMovieAction = ((rating: number) => {
            const session: string | null = localStorage.getItem('user');
            if (session) {
                const sessionId: string = JSON.parse(session).sessionId;
                const oldMovie = props.movie;
                dispatch(
                    {
                        type: "UPDATE_RATING",
                        payload: {
                            movieId: props.movie.id,
                            rating: rating
                        }
                    })
                rateMovie(rating, props.movie, sessionId)
                    .then(
                        (status) => {
                            if (status.success) {
                                console.log('status', status);
                                return status;
                            } else {
                                dispatch(
                                    {
                                        type: "UPDATE_RATING",
                                        payload: oldMovie
                                    })
                                throw new Error('Rate has not been updated. It seems there is a problem with the API');
                            }
                        }
                    )
                    .catch(err => console.error(err.message));
            }
        });

    return (
        <div className="actions-wrapper">
            <div className="star-wrapper">
                <Stars rating={props.movie.rating} rateMovie={rateMovieAction}/>
            </div>
            <FaHeart className="fa-heart" onClick={addFav}/>
        </div>
    );
}

export default Actions;