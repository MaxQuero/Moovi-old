import React from 'react';
import {Movie, TvShow} from "../../generated/graphql";
import classNames from 'classnames';
import {MediaEnum} from "../../interfaces/Media.interface";
import ToggleButton from "../ToggleButton/ToggleButton";
import ScrollbarMedia from "../ScrollbarMedia/ScrollbarMedia";

import './MediasList.scss';

type MediasListProps = {
  medias: TvShow[] | Movie[];
  loading: boolean;
  setElementsFilteredFunc: any;
  className: string;
  title: string;
  displayReleaseDate: boolean;
};
function MediasList({title, medias, loading, setElementsFilteredFunc, displayReleaseDate, className} : MediasListProps) {
  return (
      <div className={classNames("medias__section", className)}>
        <p className="medias__section__title">{title}</p>
        <ToggleButton
            config={[MediaEnum.Movie, MediaEnum.Tv]}
            setElementsFilteredFunc={(mediaType: MediaEnum) => setElementsFilteredFunc({variables: {mediaType}})}
        >
          <ScrollbarMedia
              loading={loading}
              medias={medias}
              displayReleaseDate={displayReleaseDate}
          />
        </ToggleButton>
      </div>
  )
}

export default MediasList;
