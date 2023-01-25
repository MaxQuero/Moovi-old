import React, {useEffect} from 'react';
import './Home.scss';
import {Login} from '../../guards/Auth/Auth';
import {v4 as uuidv4} from 'uuid';
import Carousel from '../../components/Carousel/Carousel';

import Media from '../../components/Media/Media';
import {MediaEnum} from '../../interfaces/Media.interface';
import Search from '../../components/Search/Search';
import ScrollbarMedia from '../../components/ScrollbarMedia/ScrollbarMedia';
import ToggleButton from '../../components/ToggleButton/ToggleButton';
import {Movie, TvShow} from "../../generated/graphql";
import {useHome} from "./Home.hook";
import MediasList from "../../components/MediasList/MediasList";

function Home() {
    const {
        var: { session, sessionId},
        state: {popularMedias, latestMedias, onTheAirMedias, trendingMedias, searchResults, loadingLatestMedias, loadingTrendingMedias, loadingOnTheAirMedias, loadingPopularMedias},
        actions: {getPopularMedias, getTrendingMedias, getLatestMedias, getOnTheAirMedias, getSearchResults}
    } = useHome()


    useEffect(() => {
        if (session) {
            getPopularMedias({variables: {mediaType: MediaEnum.Movie}})
            getTrendingMedias({variables: {mediaType: MediaEnum.Movie}})
            getOnTheAirMedias({variables: {mediaType: MediaEnum.Movie}})
            getLatestMedias({variables: {mediaType: MediaEnum.Movie}})

        } else {
            Login().then();
        }
    }, []);

    console.info('sreach', searchResults)
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
                    <div className="medias__results">
                        {searchResults &&
                            searchResults.map((media: Movie | TvShow) => (
                                <Media className="homepage__media" media={media} hasActions key={uuidv4()}/>
                            ))}
                    </div>
                </section>
            ) : (
                <section className="medias-wrapper section">
                    <MediasList
                        className="media__trending-medias"
                        title="Tendances"
                        setElementsFilteredFunc={getTrendingMedias}
                        loading={loadingTrendingMedias}
                        medias={trendingMedias}
                    />
                    <MediasList
                        className="media__trending-in-theatres"
                        title="Actuellement au cinéma"
                        setElementsFilteredFunc={getOnTheAirMedias}
                        loading={loadingOnTheAirMedias}
                        medias={onTheAirMedias}
                    />
                    <MediasList
                        className="media__trending-upcoming"
                        title="Prochaines sorties"
                        setElementsFilteredFunc={getLatestMedias}
                        loading={loadingLatestMedias}
                        medias={latestMedias}
                        displayReleaseDate
                    />
                </section>
            )}
        </div>
    );
}

export default Home;
