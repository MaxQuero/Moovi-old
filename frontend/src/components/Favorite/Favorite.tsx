import { FaHeart } from 'react-icons/fa';
import React from 'react';
import './Favorite.scss';
import {Movie, TvShow} from "../../generated/graphql";

interface Props {
  setMovieToFavoriteFunc: (favorite: boolean) => void;
  media: TvShow | Movie;
  rounded?: boolean;
  className?: string;
}

function Favorite(props: Props) {
  let classNames = 'favorite';
  classNames += props.media.favorite ? ' active' : '';
  classNames += props.rounded ? ' rounded' : '';
  classNames += ' ' + props.className || '';
  return (
    <div
      className={classNames}
      role="presentation"
      onClick={(e) => {
        e.stopPropagation();
        props.setMovieToFavoriteFunc(!props.media.favorite);
      }}
    >
      <FaHeart className="fa-heart" />
    </div>
  );
}

export default Favorite;
