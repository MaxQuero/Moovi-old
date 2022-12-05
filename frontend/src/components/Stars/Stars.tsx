import { FaStar } from 'react-icons/fa';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Stars.scss';
import {Maybe, useMutateRateMediaMutation} from "../../generated/graphql";

interface Props {
  ratingFunc: any;
  rating: Maybe<number> | undefined;
  reversed?: boolean;
  starsToDisplay: number;
}

function Stars({ ratingFunc, rating, reversed = false, starsToDisplay = 10 }: Props) {
  const stars = Array.from(Array(starsToDisplay).keys());
  const [starHovered, setStarHovered] = useState(0);
  const toggleHover = (starHovered: number) => setStarHovered(starHovered);

  const getClassNames = (currentStar: number) => {
    let classes = 'fa-star';
    currentStar <= rating && (currentStar <= starHovered || !starHovered) && (classes += ' active-star');
    currentStar <= starHovered && (classes += ' hovered');

    return classes;
  };

  return (
    <div className={reversed ? 'star-wrapper reversed' : 'star-wrapper'}>
      {stars.length > 0 &&
        stars.map((star, i) => {
          return (
            <FaStar
              key={uuidv4()}
              className={getClassNames(i + 1)}
              onMouseEnter={() => toggleHover(i + 1)}
              onMouseLeave={() => toggleHover(0)}
              onClick={(e) => {
                e.stopPropagation();
                toggleHover(0);
                ratingFunc(i + 1);
              }}
            />
          );
        })}
    </div>
  );
}

export default Stars;
