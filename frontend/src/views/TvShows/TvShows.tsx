import React, {useEffect, useState} from 'react';
import './TvShows.scss';
import {Login} from "../../guards/Auth/Auth";
import {useDispatch, useSelector} from "react-redux";
import Carousel from "../../components/Carousel/Carousel";
import {searchMedias} from "../../helpers/MediaApiCalls";
import {
    getLatestMediasList,
    getOnTheAirMediasList,
    getPopularMediasList,
    getTrendingMediasList
} from "../../helpers/Helpers";
import {MediaEnum} from '../../interfaces/Media.interface';
import ScrollbarMedia from "../../components/ScrollbarMedia/ScrollbarMedia";
import Search from "../../components/Search/Search";
import {MovieInterface} from "../../interfaces/Movie.interface";
import Media from "../../components/Media/Media";
import {v4 as uuidv4} from "uuid";


function Medias(props: any) {
    const dispatch = useDispatch();
    const popularMedias = useSelector((state: any) => state.mediasReducer.popularMedias);
    const latestMedias = useSelector((state: any) => state.mediasReducer.latestMedias);
    const onTheAirMedias = useSelector((state: any) => state.mediasReducer.onTheAirMedias);
    const trendingMedias = useSelector((state: any) => state.mediasReducer.trendingMedias);

    const [searchResultsMedias, setSearchResultsMedias] = useState([]);
    useEffect(() => {
            const session: string | null = localStorage.getItem('user');

            if (session) {
                dispatch(getPopularMediasList(MediaEnum.Tv));
                dispatch(getOnTheAirMediasList(MediaEnum.Tv));
                dispatch(getLatestMediasList(MediaEnum.Tv));
                dispatch(getTrendingMediasList(MediaEnum.Tv));
            } else {
                Login().then();
            }
        }
        , []);


    const searchResultsMediasFunc = (searchQuery: any) => {
        searchQuery ? searchMedias(MediaEnum.Tv, searchQuery, 1)
            .then(res => {
                    setSearchResultsMedias(res);
                }
            ) : setSearchResultsMedias([])
    }

    return (
        <div className="tvShows">
            <Carousel loading={popularMedias.loading} medias={popularMedias.tv}/>

            <Search searchMedias={searchResultsMediasFunc}/>
            {searchResultsMedias.length > 0 ?
                (<section className="tvShows-wrapper section">
                    <div className="tvShows__section tvShow-list__results">
                        {searchResultsMedias && searchResultsMedias.map((movie: MovieInterface) => (
                            <Media className="tvShow__media" hasActions media={movie} key={uuidv4()}/>
                        ))}
                    </div>
                </section>) :
                (<section className="tvShows-wrapper section">
                    <div className="tvShows__section tvShow__trending">
                        <p className="tvShows__section__title">Tendances</p>
                        <ScrollbarMedia loading={trendingMedias.loading} medias={trendingMedias.tv}/>
                    </div>

                    <div className="tvShows__section tvShows__on-the-air">
                        <p className="movies__section__title">Dernières sorties</p>
                        <ScrollbarMedia loading={onTheAirMedias.loading} medias={onTheAirMedias.tv}/>
                    </div>

                    <div className="tvShows__section tvShows-list__latest">
                        <p className="tvShows__section__title">Prochaines sorties</p>
                        <ScrollbarMedia loading={latestMedias.loading} medias={latestMedias.tv} displayReleaseDate/>
                    </div>

                </section>)
            }
        </div>
    );
}

export default Medias;