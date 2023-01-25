import React from 'react';
import './ScrollbarMedia.scss';
import ScrollbarHorizontal from '../ScrollbarHorizontal/ScrollbarHorizontal';
import { v4 as uuidv4 } from 'uuid';
import Media from '../Media/Media';
import { formatDate } from '../../helpers/Helpers';
import {Movie, TvShow} from "../../generated/graphql";

interface ScrollbarMediaProps {
  medias: Movie[] | TvShow[] ;
  displayReleaseDate?: boolean;
  loading: boolean;
  stateChanged?: boolean;
}

function ScrollbarMedia({medias, displayReleaseDate, loading, stateChanged = false}: ScrollbarMediaProps) {
  const emptyMedias = Array.from(Array(6).keys());

  return (
    <div className="scrollbar-media">
      {!loading && medias?.length >= 0 ? (
        <ScrollbarHorizontal>
          {medias?.map((media: Movie | TvShow) => (
                <div key={uuidv4()}>
                  <Media key={uuidv4()} className="scrollbar-media__media" media={media} hasActions />
                  {displayReleaseDate && (
                  <span className="scrollbar-media__release-date">
                    {formatDate(media?.releaseDate, 'D MMMM YYYY')}
                  </span>
                )}
              </div>
            ))}
        </ScrollbarHorizontal>
      ) : (
        emptyMedias.map(() => <Media className="homepage__media" hasActions key={uuidv4()} />)
      )}
    </div>
  );
}

export default ScrollbarMedia;
