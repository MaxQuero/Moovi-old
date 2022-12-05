import Moment from 'moment';
import React, {ReactNode, RefObject, useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './SeasonsNav.scss';
import unknown from '../../../assets/img/unknown.svg';
import ScrollbarHorizontal from '../../../components/ScrollbarHorizontal/ScrollbarHorizontal';
import classNames from 'classnames';
// @ts-ignore
import ColorThief from 'colorthief';
import {Maybe, Season} from "../../../generated/graphql";

Moment.locale('fr');

type SeasonsNavProps = {
  seasons?: Maybe<Season[]>;
  seasonSelected: number;
  changeSeasonSelected: (seasonSelected: number) => void;
};

function SeasonsNav({ seasons, seasonSelected, changeSeasonSelected }: SeasonsNavProps) {
  return (
    <div className="seasons-nav">
      <ScrollbarHorizontal>
        {seasons?.map((season: Season) => (
          <span
            key={uuidv4()}
            role="presentation"
            className={classNames('seasons-nav__season', { selected: season.seasonNumber === seasonSelected })}
            onClick={() => changeSeasonSelected(season.seasonNumber)}
          >
            <img
              className="seasons-nav__season__thumbnail"
              src={season.posterPath ? `https://image.tmdb.org/t/p/original/${season.posterPath}` : unknown}
              alt="season thumbnail"
            />
            <span className="seasons-nav__season__title">{season.name}</span>
          </span>
        ))}
      </ScrollbarHorizontal>
    </div>
  );
}

export default SeasonsNav;
