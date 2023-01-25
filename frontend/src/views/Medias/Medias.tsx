import React, {useEffect} from 'react';
import './Medias.scss';
import {Login} from '../../guards/Auth/Auth';
import {v4 as uuidv4} from 'uuid';
import Carousel from '../../components/Carousel/Carousel';
import Media from '../../components/Media/Media';
import {MediaEnum} from '../../interfaces/Media.interface';
import Search from '../../components/Search/Search';
import ScrollbarMedia from '../../components/ScrollbarMedia/ScrollbarMedia';
import {Movie, TvShow,} from "../../generated/graphql";
import {useMedias} from "./Medias.hook";

type MediasProps = {
    mediaType: MediaEnum;
};

function Medias({mediaType = MediaEnum.Movie}: MediasProps) {
    const {
        var: {session, sessionId, onTheAirLabel},
        state: {
            popularMedias,
            loadingPopularMedias,
            trendingMedias,
            loadingTrendingMedias,
            latestMedias,
            loadingLatestMedias,
            onTheAirMedias,
            loadingOnTheAirMedias,
            searchResults,
        },
        actions: {getTrendingMedias, getPopularMedias, getLatestMedias, getOnTheAirMedias, getSearchResults}
    } = useMedias(mediaType)

    useEffect(() => {
        if (session) {
            getTrendingMedias({variables: {mediaType: mediaType}})
            getPopularMedias({variables: {mediaType: mediaType}})
            getOnTheAirMedias({variables: {mediaType: mediaType}})
            getLatestMedias({variables: {mediaType: mediaType}})
        } else {
            Login().then();
        }
    }, [mediaType]);


    return (
        <div className="medias">
            <Carousel loading={loadingPopularMedias} medias={popularMedias}/>

            <Search mediaType={mediaType} searchMedias={(searchQuery: string) => {
              getSearchResults({
                variables: {
                  mediaType: mediaType,
                  query: searchQuery,
                  sessionId: sessionId,
                  page: 1
                },
                fetchPolicy: 'network-only'
              })
            }}/>
            {searchResults.length > 0 ? (
                <section className="medias__section">
                    <div className="medias__results">
                        {searchResults &&
                            searchResults.map((media: Movie | TvShow) => (
                                <Media className="medias__media" hasActions media={media} key={uuidv4()}/>
                            ))}
                    </div>
                </section>
            ) : (
                <section className="medias__section">
                    <div className="medias__section__occ medias__trending">
                        <p className="medias__section__title">Tendances</p>
                        <ScrollbarMedia loading={loadingTrendingMedias} medias={trendingMedias}/>
                    </div>

                    <div className="medias__section__occ medias__on-the-air">
                        <p className="medias__section__title"> {onTheAirLabel}</p>
                        <ScrollbarMedia loading={loadingOnTheAirMedias} medias={onTheAirMedias}/>
                    </div>

                    <div className="medias__section__occ medias__latest">
                        <p className="medias__section__title">Prochaines sorties</p>
                        <ScrollbarMedia loading={loadingLatestMedias} medias={latestMedias}
                                        displayReleaseDate/>
                    </div>
                </section>
            )}
        </div>
    );
}

export default Medias;
