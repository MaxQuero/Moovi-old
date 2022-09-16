import Moment from 'moment';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import unknown from '../../../assets/img/unknown.svg';
import Stars from '../../../components/Stars/Stars';
import { EpisodeDetailsInterface } from '../../../interfaces/EpisodeDetailsInterface.interface';
import './EpisodeDetails.scss';
import { rateEpisodeAction } from '../../../helpers/Helpers';
import { useDispatch } from 'react-redux';
import { TvShowInterface } from '../../../interfaces/TvShow.interface';

Moment.locale('fr');

type EpisodeDetailsProps = {
  media: TvShowInterface;
  seasonNumber: number;
  episode: EpisodeDetailsInterface;
};

function EpisodeDetails({ media, seasonNumber, episode }: EpisodeDetailsProps) {
  const dispatch = useDispatch();

  const rateEpisode = async (
    media: TvShowInterface,
    seasonConcernedNumber: number,
    episodeConcernedNumber: number,
    newRating: number,
  ) => {
    await rateEpisodeAction(media, episode.id, seasonConcernedNumber, episodeConcernedNumber, newRating, dispatch);
  };

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
        <Stars
          rating={episode?.rating}
          ratingFunc={(newRating: number) => rateEpisode(media, seasonNumber, episode?.episode_number, newRating)}
          starsToDisplay={10}
        />

        <p className="episode-details__infos__overview">{episode.overview}</p>
      </div>
    </div>
  );
}

export default EpisodeDetails;
