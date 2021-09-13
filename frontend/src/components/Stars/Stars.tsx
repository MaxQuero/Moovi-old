import {FaStar} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import {rateMovie} from "../../helpers/ApiCalls";
import {v4 as uuidv4} from "uuid";
import "./Stars.scss";

function Stars(props: any) {

    const [stars, setStars] = useState(Array.from(Array(10).keys()));
    const [starHovered, setStarHovered] = useState();
    const toggleHover = (starHovered: number) => setStarHovered(starHovered);

    const getClassNames = (currentStar: number) => {
        let classes = "fa-star";

        (currentStar <= props.rating) && (classes += " active-star");
        (currentStar <= starHovered) && (classes += " hovered");

        return classes;
    }

    return (
        <>
            { stars.map((star, i) => {
                const note = Math.abs(i-10);

                return (
                    <FaStar key={uuidv4()}
                            className={getClassNames(i+1)}
                            onMouseEnter={() => toggleHover(i+1)}
                            onMouseLeave={() => toggleHover(0)}
                            onClick={(e) => {e.stopPropagation(); props.rateMovie(note)}}/>
                );
            })
            }
        </>
    );

}

export default Stars;