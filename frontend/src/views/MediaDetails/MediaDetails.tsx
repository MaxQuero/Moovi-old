import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Backdrop from '../../components/Backdrop/Backdrop';
import Moment from 'moment';
import 'moment/locale/fr';
import Casting from '../../components/Casting/Casting';
import ScrollbarMedia from '../../components/ScrollbarMedia/ScrollbarMedia';
import { getMediaDetails, getMediaSeasonDetails } from '../../helpers/Helpers';
import { MediaEnum } from '../../interfaces/Media.interface';
import { SeasonDetailsInterface } from '../../interfaces/SeasonDetails.interface';
import Seasons from '../Seasons/Seasons';
import './MediaDetails.scss';
import { TvShowInterface } from '../../interfaces/TvShow.interface';

Moment.locale('fr');

type MediasDetailsProps = {
  mediaType: MediaEnum;
};

type ParamTypes = {
  id: string;
};

function MediaDetails({ mediaType = MediaEnum.Movie }: MediasDetailsProps) {
  const dispatch = useDispatch();
  const params: ParamTypes = useParams();
  const mediaId = params.id;
  const mediaDetails = useSelector((state: any) => state.mediasReducer.mediaDetails);

  const findSeasonByNumber = (media: TvShowInterface, seasonNumberSelected: number) => {
    return media?.seasons?.find(
      (season: SeasonDetailsInterface) => season.season_number === seasonNumberSelected,
    ) as SeasonDetailsInterface;
  };

  const [seasonSelected, setSeasonSelected] = useState<SeasonDetailsInterface>({} as SeasonDetailsInterface);

  const session: string | null = localStorage.getItem('user');
  const sessionId: string = session && JSON.parse(session).sessionId;

  useEffect(() => {
    if (session) {
      (async () => {
        const res = await dispatch(getMediaDetails(mediaId, mediaType, sessionId));
        setSeasonSelected(findSeasonByNumber(res, 1));
      })();
    } else {
      dispatch(getMediaDetails(mediaId, mediaType));
    }
  }, []);

  const changeSeasonSelected = async (seasonSelectedNumber: number) => {
    let seasonDetailsSelected = findSeasonByNumber(mediaDetails, seasonSelectedNumber);
    if (!seasonDetailsSelected?.episodes) {
      seasonDetailsSelected = await dispatch(getMediaSeasonDetails(mediaDetails.id, seasonSelectedNumber, sessionId));
    }
    setSeasonSelected(seasonDetailsSelected);
  };

  return (
    <>
      <div className="media__details">
        <Backdrop media={mediaDetails} />

        <Casting cast={mediaDetails.actors} crew={mediaDetails.directors} />

        {mediaDetails.type === MediaEnum.Tv && (
          <Seasons
            media={mediaDetails}
            seasons={mediaDetails?.seasons}
            seasonSelected={seasonSelected}
            changeSeasonSelected={(seasonNumber: number) => changeSeasonSelected(seasonNumber)}
          />
        )}

        <div className="media-details__recommendations">
          <span className="media-details__recommendations__title"> Recommandations </span>
          <ScrollbarMedia loading={mediaDetails.loading} medias={mediaDetails.recommendations} />
        </div>
      </div>
    </>
  );
}

export default MediaDetails;
