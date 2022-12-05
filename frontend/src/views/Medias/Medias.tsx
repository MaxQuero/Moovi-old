import React, {useCallback, useEffect, useState} from 'react';
import './Medias.scss';
import { Login } from '../../guards/Auth/Auth';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from '../../components/Carousel/Carousel';

import {
  getLatestMediasList,
  getOnTheAirMediasList,
  getPopularMediasList,
  getTrendingMediasList,
} from '../../helpers/Helpers';
import Media from '../../components/Media/Media';
import { MediaEnum } from '../../interfaces/Media.interface';
import { searchMedias } from '../../helpers/MediaApiCalls';
import Search from '../../components/Search/Search';
import ScrollbarMedia from '../../components/ScrollbarMedia/ScrollbarMedia';
import {
  Movie,
  TvShow,
  useGetLatestMediasLazyQuery,
  useGetOnTheAirMediasLazyQuery,
  useGetOnTheAirMediasQuery,
  useGetPopularMediasLazyQuery,
  useGetPopularMediasQuery,
  useGetTrendingMediasLazyQuery,
  useGetTrendingMediasQuery, useSearchMediasLazyQuery
} from "../../generated/graphql";

type MediasProps = {
  mediaType: MediaEnum;
};

function Medias({ mediaType = MediaEnum.Movie }: MediasProps) {
  const session: string | null = localStorage.getItem('user');
  const sessionId: string = session && JSON.parse(session).sessionId;
  const [getSearchResults, {
    data: {searchResults = []} = {},
    loading: loadingSearchResults
  }] = useSearchMediasLazyQuery()
  const [getTrendingMedias, { data: trendingMedias, loading: loadingTrendingMedias } ] =  useGetTrendingMediasLazyQuery()
  const [getPopularMedias, {data: { popularMedias = []} = {} , loading: loadingPopularMedias } ] =  useGetPopularMediasLazyQuery()
  const [getOnTheAirMedias, {data: onTheAirMedias, loading: loadingOnTheAirMedias } ] =  useGetOnTheAirMediasLazyQuery()
  const [getLatestMedias, {data: latestMedias, loading: loadingLatestMedias } ] =  useGetLatestMediasLazyQuery()
  const [onTheAirLabel, setOnTheAirLabel] = useState('Actuellement au cinéma');
  const [resultsSearch, setResultsSearch] = useState([])
  useEffect(() => {
    const session: string | null = localStorage.getItem('user');
    if (session) {
      getTrendingMedias({variables: {mediaType: mediaType}})
      getPopularMedias({variables: {mediaType: mediaType}})
      getOnTheAirMedias({variables: {mediaType: mediaType}})
      getLatestMedias({variables: {mediaType: mediaType}})
      setOnTheAirLabel(mediaType === MediaEnum.Movie ? 'Actuellement au cinéma' : 'Dernières sorties');
    } else {
      Login().then();
    }
  }, [mediaType]);

  useEffect(() => {
    setResultsSearch(searchResults)
  },  [searchResults.length])

const searchMedias = useCallback((searchQuery: string) => {
    getSearchResults({
      variables: {
        mediaType: mediaType,
        query: searchQuery,
        sessionId: sessionId,
        page: 1
      },
      fetchPolicy: 'network-only'
    })

}, [mediaType])

  useEffect(() => {
    searchMedias('')
  }, [mediaType])

  return (
    <div className="medias">
      <Carousel loading={loadingPopularMedias} medias={ popularMedias } />

      <Search mediaType={mediaType} searchMedias={(searchQuery: string) => {
        searchMedias(searchQuery)
      }}/>
      {resultsSearch.length > 0 ? (
        <section className="medias__section">
          <div className="medias__results">
            {resultsSearch &&
                resultsSearch.map((media: Movie | TvShow) => (
                <Media className="medias__media" hasActions media={media} key={uuidv4()} />
              ))}
          </div>
        </section>
      ) : (
        <section className="medias__section">
          <div className="medias__section__occ medias__trending">
            <p className="medias__section__title">Tendances</p>
            <ScrollbarMedia loading={loadingTrendingMedias} medias={trendingMedias?.trendingMedias} />
          </div>

          <div className="medias__section__occ medias__on-the-air">
            <p className="medias__section__title"> {onTheAirLabel}</p>
            <ScrollbarMedia loading={loadingOnTheAirMedias} medias={onTheAirMedias?.onTheAirMedias} />
          </div>

          <div className="medias__section__occ medias__latest">
            <p className="medias__section__title">Prochaines sorties</p>
            <ScrollbarMedia loading={loadingLatestMedias} medias={latestMedias?.latestMedias} displayReleaseDate />
          </div>
        </section>
      )}
    </div>
  );
}

export default Medias;
