import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import Moment from 'moment';
import 'moment/locale/fr';
import { MediaEnum } from '../../interfaces/Media.interface';
import './MediaDetails.scss';
import {useMediaDetails, useSeasonDetails} from "../../hooks/useMediaDetails.hook";
import {initialMedia} from "../../helpers/initialData";
import {
  Movie,
  Season,
  TvShow,
  useGetMediaDetailsLazyQuery,
  useGetTrendingMediasLazyQuery
} from "../../generated/graphql";
import {Login} from "../../guards/Auth/Auth";
import Backdrop from "../../components/Backdrop/Backdrop";
import ScrollbarMedia from "../../components/ScrollbarMedia/ScrollbarMedia";
import Seasons from "../Seasons/Seasons";
import Casting from "../../components/Casting/Casting";

Moment.locale('fr');

type MediasDetailsProps = {
  mediaType: MediaEnum;
};

type ParamTypes = {
  id: string;
};

function MediaDetails({ mediaType = MediaEnum.Movie }: MediasDetailsProps) {
  const { id }  = useParams() as ParamTypes;
  const mediaId = parseInt(id)
  const session: string | null = localStorage.getItem('user');
  const sessionId: string = session && JSON.parse(session).sessionId;

  const [getMediaDetails, { data : { mediaDetails = {} as TvShow} = {}, loading }] = useGetMediaDetailsLazyQuery()

  useEffect(() => {
    if (!session) {
      Login().then()
    } else {
      getMediaDetails({ variables: {mediaId: mediaId, mediaType: mediaType, sessionId: sessionId}})
    }
  }, [])

  return (
    <>
      {
        mediaDetails  && (<div className="media__details">
          <Backdrop media={mediaDetails} />
          <Casting cast={mediaDetails.actors} crew={mediaDetails.directors} />

          {mediaDetails.type === MediaEnum.Tv && (
              <Seasons
                  media={mediaDetails}
                  seasons={mediaDetails?.seasons}
              />
          )}

            <div className="media-details__recommendations">
              <span className="media-details__recommendations__title"> Recommandations </span>
              <ScrollbarMedia loading={mediaDetails.loading} medias={mediaDetails.recommendations} />
            </div>
          </div>)
      }
    </>
  );
}

export default MediaDetails;
