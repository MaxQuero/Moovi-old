import Moment from 'moment';
import React from 'react';
import './SeasonDetails.scss';
import { EpisodeDetailsInterface } from '../../../interfaces/EpisodeDetailsInterface.interface';
import EpisodeDetails from '../EpisodeDetails/EpisodeDetails';
import { SeasonDetailsInterface } from '../../../interfaces/SeasonDetails.interface';
import { TvShowInterface } from '../../../interfaces/TvShow.interface';

Moment.locale('fr');

type SeasonDetailsProps = {
  media: TvShowInterface;
  season: SeasonDetailsInterface;
};

function SeasonDetails({ media, season }: SeasonDetailsProps) {
  return (
    <div className="season-details">
      <span className="season-details__overview">{season?.overview}</span>
      <div className="season-details__episodes">
        {season?.episodes?.map((episode: EpisodeDetailsInterface) => (
          <>
            <EpisodeDetails media={media} seasonNumber={season?.season_number} episode={episode} />
            <hr />
          </>
        ))}
      </div>
    </div>
  );
}

export default SeasonDetails;
