import React from 'react';
import './Media.scss';
import { useHistory } from 'react-router-dom';
import { MovieInterface } from '../../interfaces/Movie.interface';
import { TvShowInterface } from '../../interfaces/TvShow.interface';
import Skeleton from '../Skeleton/Skeleton';
import Actions from '../Actions/Actions';
import unknownMedia from '../../assets/img/unknownMedia.svg';
import classNames from 'classnames'; // relative path to image

interface Props {
  media?: MovieInterface | TvShowInterface;
  getTheme?: any;
  hasActions?: boolean;
  className?: string;
}

function Media({ media, getTheme, hasActions, className }: Props) {
  const history = useHistory();
  /**
   * Redirect to media details page
   */
  const goToMediaDetailsPage = (media?: MovieInterface | TvShowInterface) => {
    history.push(`/${media?.type}/${media?.id}`);
  };

  return (
    <div className={classNames('media', className)}>
      {media ? (
        <div className="poster-wrapper" role="presentation" onClick={() => goToMediaDetailsPage(media)}>
          <img
            className={classNames('poster', { unknown: !media?.poster })}
            crossOrigin="anonymous"
            src={media?.poster ?? unknownMedia}
            alt={media?.title}
          />
          <div className="global-note">{media?.voteAverage !== 0 ? media?.voteAverage : '_'}</div>
          {hasActions && <Actions media={media} />}
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}

export default Media;
