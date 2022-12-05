import Moment from 'moment';
import React from 'react';
import './SeasonDetails.scss';
import {Episode, Season, TvShow} from "../../../generated/graphql";
import EpisodeDetails from "../EpisodeDetails/EpisodeDetails";

Moment.locale('fr');

type SeasonDetailsProps = {
  media: TvShow;
  season: Season;
};

function SeasonDetails({ media, season }: SeasonDetailsProps) {
  return (
    <div className="season-details">
      <span className="season-details__overview">{season?.overview}</span>
      <div className="season-details__episodes">
        {season?.episodes?.map((episode: Episode) => (
          <>
            <EpisodeDetails media={media} seasonNumber={season?.seasonNumber} episode={episode} />
            <hr />
          </>
        ))}
      </div>
    </div>
  );
}

export default SeasonDetails;
