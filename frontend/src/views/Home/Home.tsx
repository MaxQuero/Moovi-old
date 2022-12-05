import React, {useCallback, useEffect, useState} from 'react';
import './Home.scss';
import {Login} from '../../guards/Auth/Auth';
import {v4 as uuidv4} from 'uuid';
import Carousel from '../../components/Carousel/Carousel';

import Media from '../../components/Media/Media';
import {MediaEnum} from '../../interfaces/Media.interface';
import Search from '../../components/Search/Search';
import ScrollbarMedia from '../../components/ScrollbarMedia/ScrollbarMedia';
import ToggleButton from '../../components/ToggleButton/ToggleButton';
import {
    Movie, TvShow, useGetLatestMediasLazyQuery,
    useGetOnTheAirMediasLazyQuery,
    useGetPopularMediasLazyQuery,
    useGetTrendingMediasLazyQuery, useSearchMediasLazyQuery
} from "../../generated/graphql";

function Home() {
    const session: string | null = localStorage.getItem('user');
    const sessionId: string = session && JSON.parse(session).sessionId;
    const [getTrendingMedias, {
        data: {trendingMedias = {}} = {},
        loading: loadingTrendingMedias
    }] = useGetTrendingMediasLazyQuery()
    const [getPopularMedias, {
        data: {popularMedias = {}} = {},
        loading: loadingPopularMedias
    }] = useGetPopularMediasLazyQuery()
    const [getOnTheAirMedias, {
        data: {onTheAirMedias = {}} = {},
        loading: loadingOnTheAirMedias
    }] = useGetOnTheAirMediasLazyQuery()
    const [getLatestMedias, {
        data: {latestMedias = {}} = {},
        loading: loadingLatestMedias
    }] = useGetLatestMediasLazyQuery()
    const [getSearchResults, {
        data: {searchResults = []} = {},
        loading: loadingSearchResults
    }] = useSearchMediasLazyQuery()

    const [trendingMediasFiltered, setTrendingMediasFiltered] = useState(MediaEnum.Movie);
    const [onTheAirMediasFiltered, setOnTheAirMediasFiltered] = useState(MediaEnum.Movie);
    const [latestMediasFiltered, setLatestMediasFiltered] = useState(MediaEnum.Movie);

    useEffect(() => {
        if (session) {
            getPopularMedias({variables: {mediaType: MediaEnum.Movie}})
        } else {
            Login().then();
        }
    }, []);


    useEffect(() => {
        getTrendingMedias({variables: {mediaType: trendingMediasFiltered}})
    }, [trendingMediasFiltered]);

    useEffect(() => {
        getOnTheAirMedias({variables: {mediaType: onTheAirMediasFiltered}})
    }, [onTheAirMediasFiltered])

    useEffect(() => {
        getLatestMedias({variables: {mediaType: latestMediasFiltered}})
    }, [latestMediasFiltered])


    return (
        <div className="homepage">
            <Carousel loading={loadingPopularMedias} medias={popularMedias}/>
            <Search searchMedias={(searchQuery: string) => {
                getSearchResults({
                    variables: {
                        mediaType: MediaEnum.All,
                        query: searchQuery,
                        sessionId: sessionId,
                        page: 1
                    }
                })
            }}/>
            {searchResults.length > 0 ? (
                <section className="medias-wrapper section">
                    <div className="medias__section movie-list__results">
                        {searchResults &&
                            searchResults.map((media: Movie | TvShow) => (
                                <Media className="homepage__media" media={media} hasActions key={uuidv4()}/>
                            ))}
                    </div>
                </section>
            ) : (
                <section className="medias-wrapper section">
                    <div className="medias__section media__trending-medias">
                        <p className="medias__section__title">Tendances</p>
                        <ToggleButton
                            config={[MediaEnum.Movie, MediaEnum.Tv]}
                            selectedItem={trendingMediasFiltered}
                            setElementsFilteredFunc={(mediaType: MediaEnum) => setTrendingMediasFiltered(mediaType)}
                        >
                            <ScrollbarMedia
                                loading={loadingTrendingMedias}
                                medias={trendingMedias}
                            />
                        </ToggleButton>
                    </div>

                    <div className="medias__section media__in-theatres">
                        <p className="medias__section__title">Actuellement au cinéma</p>
                        <ToggleButton
                            config={[MediaEnum.Movie, MediaEnum.Tv]}
                            selectedItem={onTheAirMediasFiltered}
                            setElementsFilteredFunc={(mediaType: MediaEnum) => setOnTheAirMediasFiltered(mediaType)}
                        >
                            <ScrollbarMedia loading={loadingOnTheAirMedias} medias={onTheAirMedias}/>
                        </ToggleButton>
                    </div>

                    <div className="medias__section movie-list__upcoming">
                        <p className="medias__section__title">Prochaines sorties</p>
                        <ToggleButton
                            config={[MediaEnum.Movie, MediaEnum.Tv]}
                            selectedItem={latestMediasFiltered}
                            setElementsFilteredFunc={(mediaType: MediaEnum) => setLatestMediasFiltered(mediaType)}
                        >
                            <ScrollbarMedia
                                loading={loadingLatestMedias}
                                medias={latestMedias}
                                displayReleaseDate
                            />
                        </ToggleButton>
                    </div>
                </section>
            )}
        </div>
    );
}

export default Home;
