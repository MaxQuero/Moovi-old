import { FaStar } from 'react-icons/fa';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Stars.scss';
import { MovieInterface } from '../../interfaces/Movie.interface';
import { TvShowInterface } from '../../interfaces/TvShow.interface';

interface Props {
  rateMediaFunc: any;
  media: MovieInterface | TvShowInterface;
  reversed?: boolean;
  starsToDisplay: number;
}

function Stars(props: Props) {
  const stars = Array.from(Array(props.starsToDisplay).keys());
  const [starHovered, setStarHovered] = useState();
  const toggleHover = (starHovered: number | null) => setStarHovered(starHovered);

  const getClassNames = (currentStar: number) => {
    let classes = 'fa-star';
    currentStar <= props.media?.rating && (currentStar <= starHovered || !starHovered) && (classes += ' active-star');
    currentStar <= starHovered && (classes += ' hovered');

    return classes;
  };

  return (
    <div className={props?.reversed ? 'star-wrapper reversed' : 'star-wrapper'}>
      {stars.length > 0 &&
        stars.map((star, i) => {
          return (
            <FaStar
              key={uuidv4()}
              className={getClassNames(i + 1)}
              onMouseEnter={() => toggleHover(i + 1)}
              onMouseLeave={() => toggleHover(null)}
              onClick={(e) => {
                e.stopPropagation();
                toggleHover(null);
                props.rateMediaFunc(props.media, i + 1);
              }}
            />
          );
        })}
    </div>
  );
}

export default Stars;
