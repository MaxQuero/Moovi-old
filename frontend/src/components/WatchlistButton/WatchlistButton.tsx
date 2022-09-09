import { FaTasks } from 'react-icons/fa';
import React from 'react';
import './WatchlistButton.scss';
import { MovieInterface } from '../../interfaces/Movie.interface';
import { TvShowInterface } from '../../interfaces/TvShow.interface';

interface Props {
  setMediaToWatchlistFunc: any;
  media: MovieInterface | TvShowInterface;
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
        props.setMediaToWatchlistFunc(props.media, !props.media.watchlist);
      }}
    />
  );
}

export default WatchlistButton;
