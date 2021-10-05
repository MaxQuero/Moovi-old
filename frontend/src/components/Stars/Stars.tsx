import {FaStar} from "react-icons/fa";
import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";
import "./Stars.scss";
import {MovieInterface} from "../Movie/Movie.interface";

interface Props {
    rateMovieFunc: any,
    movie: MovieInterface
}
function Stars(props: any) {

    const [stars, setStars] = useState(Array.from(Array(10).keys()));
    const [starHovered, setStarHovered] = useState();
    const toggleHover = (starHovered: number|null) => setStarHovered(starHovered);

    const getClassNames = (currentStar: number) => {

        let classes = "fa-star";
        ((currentStar <= props.movie.rating) && ((currentStar <= starHovered) || !starHovered))
            && (classes += " active-star");
        (currentStar <= starHovered) && (classes += " hovered");

        return classes;
    }

    return (
         <div className="star-wrapper">
        { stars.map((star, i) => {
                return (
                    <FaStar key={uuidv4()}
                            className={getClassNames(i+1)}
                            onMouseEnter={() => toggleHover(i+1)}
                            onMouseLeave={() => toggleHover(null)}
                            onClick={(e) => {e.stopPropagation(); toggleHover(null); props.rateMovieFunc(props.movie, i+1)}}/>
                );
            })
            }
        </div>
    );

}

export default Stars;