import Moment from 'moment';
import React from 'react';
import { SeasonDetailsInterface } from '../../interfaces/SeasonDetails.interface';
import SeasonsNav from './SeasonsNav/SeasonsNav';
import SeasonDetails from './SeasonDetails/SeasonDetails';
import { TvShowInterface } from '../../interfaces/TvShow.interface';
import './Seasons.scss';
Moment.locale('fr');

type SeasonsProps = {
  media: TvShowInterface;
  seasons: SeasonDetailsInterface[];
  seasonSelected: SeasonDetailsInterface;
  changeSeasonSelected: (seasonNumber: number) => void;
};

function Seasons({ media, seasons, seasonSelected, changeSeasonSelected }: SeasonsProps) {
  return (
    <div className="seasons">
      <SeasonsNav
        seasons={seasons}
        seasonSelected={seasonSelected.season_number}
        changeSeasonSelected={changeSeasonSelected}
      />
      <SeasonDetails media={media} season={seasonSelected} />
    </div>
  );
}

export default Seasons;
