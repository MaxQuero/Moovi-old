import {MovieInterface} from "../Movie/movie.interface";
import {FaStar} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import {rateMovie} from "../../helpers/api_call";
import {v4 as uuidv4} from "uuid";
import "./Stars.scss";

function Stars(props: any) {

    const [stars, setStars] = useState(Array.from(Array(10).keys()));

    return (
        <>
            { stars.map((star, i) => {
                const note = Math.abs(i-10);

                return (
                    <FaStar className="fa-star" key={uuidv4()} onClick={(e) => {e.stopPropagation(); props.rateMovie(note)}}/>
                );
            })
            }
        </>
    );

}

export default Stars;