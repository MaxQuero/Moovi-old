import React from 'react';
import './Media.scss';
import Skeleton from '../Skeleton/Skeleton';
import Actions from '../Actions/Actions';
import unknownMedia from '../../assets/img/unknownMedia.svg';
import classNames from 'classnames';
import {useNavigate} from "react-router-dom";
import {Movie, TvShow} from "../../generated/graphql"; // relative path to image

interface Props {
  media?: Movie | TvShow;
  getTheme?: any;
  hasActions?: boolean;
  className?: string;
}


function Media({ media, hasActions, className }: Props) {
  const navigate = useNavigate();
  /**
   * Redirect to media details page
   */
  const goToMediaDetailsPage = (media?: Movie | TvShow) => {

    navigate(`/${media?.type}/${media?.id}`);
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
