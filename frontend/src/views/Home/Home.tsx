import React, {useEffect, useState} from 'react';
import './Home.scss';
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
import ToggleButton from "../../components/ToggleButton/ToggleButton";

function Home(props: any) {
    const dispatch = useDispatch();
    const popularMedias = useSelector((state: any) => state.mediasReducer.popularMedias);
    const latestMedias = useSelector((state: any) => state.mediasReducer.latestMedias);
    const onTheAirMedias = useSelector((state: any) => state.mediasReducer.onTheAirMedias);
    const trendingMedias = useSelector((state: any) => state.mediasReducer.trendingMedias);

    const [searchResultsMovies, setSearchResultsMovies] = useState([]);
    const [trendingMediasFiltered, setTrendingMediasFiltered] = useState(MediaEnum.Movie);
    const [latestMediasFiltered, setLatestMediasFiltered] = useState(MediaEnum.Movie);
    const [onTheAirMediasFiltered, setOnTheAirMediasFiltered] = useState(MediaEnum.Movie);


    useEffect(() => {
            const session: string | null = localStorage.getItem('user');

            if (session) {
                dispatch(getPopularMediasList(MediaEnum.Movie));
                dispatch(getLatestMediasList(latestMediasFiltered));
                dispatch(getOnTheAirMediasList(onTheAirMediasFiltered));
                dispatch(getTrendingMediasList(MediaEnum.All));
            } else {
                Login().then();
            }
        }
        , []);

    const filterMediasWatchlist = (property: string, mediaType: MediaEnum) => {

        switch (property) {
            case "latest" :
                if  (Array.isArray(latestMedias[mediaType]) && !latestMedias[mediaType].length) {
                    dispatch(getLatestMediasList(mediaType));
                }
                setLatestMediasFiltered(mediaType);
                break;

            case "onTheAir" :
                if  (Array.isArray(onTheAirMedias[mediaType]) && !onTheAirMedias[mediaType].length) {

                    dispatch(getOnTheAirMediasList(mediaType));
                }
                    setOnTheAirMediasFiltered(mediaType);

                break;

            case "trending" :
                setTrendingMediasFiltered(mediaType)
                break;
        }

    }

    const searchResultsMoviesFunc = (searchQuery: any) => {
        searchQuery ? searchMedias(MediaEnum.All, searchQuery, 1)
            .then((res: any) => {
                    setSearchResultsMovies(res);
                }
            ) : setSearchResultsMovies([])
    }

    const getTrendingMediasFiltered = (mediaType: MediaEnum) => {
        const medias= (mediaType: MediaEnum) => (el: any) =>  (el.type === mediaType);
        return trendingMedias['all'].filter(medias(mediaType));
    }

    return (
        <div className="homepage">
            {popularMedias.loading}
            <Carousel loading={popularMedias.loading} medias={popularMedias.movie}/>
            <Search searchMedias={searchResultsMoviesFunc}/>
            {searchResultsMovies.length > 0 ?
                (
                    <section className="medias-wrapper section">
                        <div className="medias__section movie-list__results">
                            {
                                searchResultsMovies && searchResultsMovies.map((movie: MovieInterface) => (
                                    <Media className="homepage__media" media={movie} hasActions key={uuidv4()}/>
                                ))
                            }
                        </div>
                    </section>)
                : (
                    <section className="medias-wrapper section">
                        <div className="medias__section media__trending-medias">
                            <p className="medias__section__title">Tendances</p>
                            <ToggleButton config={[MediaEnum.Movie, MediaEnum.Tv]}
                                          selectedItem={trendingMediasFiltered}
                                          setElementsFilteredFunc={(mediaType: MediaEnum) => filterMediasWatchlist('trending', mediaType)}
                            >
                                <ScrollbarMedia loading={trendingMedias.loading} medias={getTrendingMediasFiltered(trendingMediasFiltered)}/>
                            </ToggleButton>
                        </div>

                        <div className="medias__section media__in-theatres">
                            <p className="medias__section__title">Actuellement au cinéma</p>
                            <ToggleButton config={[MediaEnum.Movie, MediaEnum.Tv]}
                                          selectedItem={onTheAirMediasFiltered}
                                          setElementsFilteredFunc={(mediaType: MediaEnum) => filterMediasWatchlist('onTheAir', mediaType)}
                            >
                                <ScrollbarMedia loading={onTheAirMedias.loading} medias={onTheAirMedias[onTheAirMediasFiltered]}/>
                            </ToggleButton>
                        </div>

                        <div className="medias__section movie-list__upcoming">
                            <p className="medias__section__title">Prochaines sorties</p>
                            <ToggleButton config={[MediaEnum.Movie, MediaEnum.Tv]}
                                          selectedItem={latestMediasFiltered}
                                          setElementsFilteredFunc={(mediaType: MediaEnum) => filterMediasWatchlist('latest', mediaType)}
                            >
                                <ScrollbarMedia loading={latestMedias.loading} medias={latestMedias[latestMediasFiltered]}
                                                displayReleaseDate/>
                            </ToggleButton>


                        </div>
                    </section>
                )
            }
        </div>
    );
}

export default Home;