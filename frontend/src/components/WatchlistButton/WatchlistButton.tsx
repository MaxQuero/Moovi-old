import { FaTasks } from 'react-icons/fa';
import React from 'react';
import './WatchlistButton.scss';
import {Movie, TvShow} from "../../generated/graphql";

interface Props {
  setMediaToWatchlistFunc: any;
  media: Movie | TvShow;
  className?: string;
}

function WatchlistButton(props: Props) {
  let classes = 'fa-tasks';
  props.media.watchlist && (classes += ' active');
  props.className && (classes += ' ' + props.className);

  return (
    <FaTasks
      className={classes}
      onClick={(e) => {
        e.stopPropagation();
        props.setMediaToWatchlistFunc(!props.media.watchlist);
      }}
    />
  );
}

export default WatchlistButton;
