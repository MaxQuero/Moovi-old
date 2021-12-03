import React, {useEffect, useState} from 'react';
import './Movies.scss';
import {Login} from "../../guards/Auth/Auth";
import {v4 as uuidv4} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import Carousel from "../../components/Carousel/Carousel";

import {
    getLatestMediasList,
    getOnTheAirMediasList,
    getPopularMediasList,
    getTrendingMediasList
} from "../../helpers/Helpers";
import {MovieInterface} from "../../interfaces/Movie.interface";
import Media from "../../components/Media/Media";
import {MediaEnum} from "../../interfaces/Media.interface";
import {searchMedias} from "../../helpers/MediaApiCalls";
import Search from "../../components/Search/Search";
import ScrollbarMedia from "../../components/ScrollbarMedia/ScrollbarMedia";

function Movies(props: any) {
    const dispatch = useDispatch();
    const popularMedias = useSelector((state: any) => state.mediasReducer.popularMedias);
    const trendingMedias = useSelector((state: any) => state.mediasReducer.trendingMedias);
    const latestMedias = useSelector((state: any) => state.mediasReducer.latestMedias);
    const onTheAirMedias = useSelector((state: any) => state.mediasReducer.onTheAirMedias);

    const [searchResultsMedias, setSearchResultsMedias] = useState([]);

    useEffect(() => {
            const session: string | null = localStorage.getItem('user');
            if (session) {
                dispatch(getPopularMediasList(MediaEnum.Movie));
                dispatch(getOnTheAirMediasList(MediaEnum.Movie));
                dispatch(getLatestMediasList(MediaEnum.Movie));
                dispatch(getTrendingMediasList(MediaEnum.Movie));
            } else {
                Login().then();
            }
        }
        , []);


    const searchResultsMediasFunc = (searchQuery: any) => {
        searchQuery ? searchMedias(MediaEnum.Movie, searchQuery, 1)
            .then((res: any) => {
                    setSearchResultsMedias(res);
                }
            ) : setSearchResultsMedias([])
    }

    return (
        <div className="movies">
            <Carousel loading={popularMedias.loading} medias={popularMedias.movie}/>

            <Search searchMedias={searchResultsMediasFunc}/>
            {searchResultsMedias.length > 0 ?
                (<section className="movies-wrapper">
                    <div className="movies-section movie-list__results">
                        {searchResultsMedias && searchResultsMedias.map((movie: MovieInterface) => (
                            <Media className="movie__media" hasActions media={movie} key={uuidv4()}/>
                        ))}
                    </div>
                </section>) :

                (<section className="movies-wrapper">
                    <div className="movies__section media__trending">
                        <p className="movies__section__title">Tendances</p>
                        <ScrollbarMedia loading={trendingMedias.loading} medias={trendingMedias.movie}/>
                    </div>

                    <div className="movies__section movies__on-the-air">
                        <p className="movies__section__title">Actuellement au cinéma</p>
                        <ScrollbarMedia loading={onTheAirMedias.loading} medias={onTheAirMedias.movie}/>
                    </div>

                    <div className="movies__section movies-list__latest">
                        <p className="movies__section__title">Prochaines sorties</p>
                        <ScrollbarMedia loading={latestMedias.loading} medias={latestMedias.movie} displayReleaseDate/>
                    </div>
                </section>)}

        </div>
    );
}

export default Movies;