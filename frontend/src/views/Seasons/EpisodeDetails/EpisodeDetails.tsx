import Moment from 'moment';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import unknown from '../../../assets/img/unknown.svg';
import Stars from '../../../components/Stars/Stars';
import { EpisodeDetailsInterface } from '../../../interfaces/EpisodeDetailsInterface.interface';
import './EpisodeDetails.scss';
import { TvShowInterface } from '../../../interfaces/TvShow.interface';
import { MovieInterface } from '../../../interfaces/Movie.interface';
import { rateMediaAction } from '../../../helpers/Helpers';

Moment.locale('fr');

type EpisodeDetailsProps = {
  media: TvShowInterface;
  episode: EpisodeDetailsInterface;
};

function EpisodeDetails({ media, episode }: EpisodeDetailsProps) {
  return (
    <div className="episode-details" key={uuidv4()}>
      <div className="episode-details__thumbnail-wrapper">
        <img
          className="episode-details__thumbnail"
          alt="Episode thumbnail"
          src={
            episode.still_path ? `https://www.themoviedb.org/t/p/w454_and_h254_bestv2/${episode.still_path}` : unknown
          }
        />
      </div>

      <div className="episode-details__infos">
        <span className="episode-details__infos__title">
          {episode.episode_number}. {episode.name}
        </span>
        <span className="episode-details__infos__rating">{Number(episode.vote_average.toFixed(1))}</span>
        <Stars media={media} starsToDisplay={10} />

        <p className="episode-details__infos__overview">{episode.overview}</p>
      </div>
    </div>
  );
}

export default EpisodeDetails;
