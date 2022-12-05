import React from 'react';
import './Trash.scss';
import { FaTrash } from 'react-icons/all';
import {Movie, TvShow} from "../../generated/graphql";

interface Props {
  deleteMovieFromWatchlistFunc: any;
  rounded?: boolean;
  media: Movie | TvShow;
  className?: string;
}

function Trash(props: Props) {
  let classNames = 'trash';
  classNames += props.media.watchlist ? ' active' : '';
  classNames += props.rounded ? ' rounded' : '';
  classNames += ' ' + props.className || '';
  return (
    <div
      className={classNames}
      role="presentation"
      onClick={(e) => {
        e.stopPropagation();
        props.deleteMovieFromWatchlistFunc(props.media, false);
      }}
    >
      <FaTrash className="fa-trash" />
    </div>
  );
}

export default Trash;
