import React from 'react';
import './ScrollbarMedia.scss';
import ScrollbarHorizontal from '../ScrollbarHorizontal/ScrollbarHorizontal';
import { v4 as uuidv4 } from 'uuid';
import { MovieInterface } from '../../interfaces/Movie.interface';
import Media from '../Media/Media';
import { TvShowInterface } from '../../interfaces/TvShow.interface';
import { formatDate } from '../../helpers/Helpers';

interface Props {
  medias: any;
  displayReleaseDate?: boolean;
  loading: boolean;
  stateChanged?: boolean;
}

function ScrollbarMedia(props: Props) {
  const emptyMedias = Array.from(Array(6).keys());

  return (
    <div className="scrollbar-media">
      {!props.loading && props.medias.length >= 0 ? (
        <ScrollbarHorizontal>
          {props.medias &&
            props.medias.map((media: MovieInterface | TvShowInterface) => (
              <div key={uuidv4()}>
                <Media className="scrollbar-media__media" media={media} hasActions />
                {props.displayReleaseDate && (
                  <span className="scrollbar-media__release-date">
                    {formatDate(props.medias.releaseDate, 'D MMMM YYYY')}
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
