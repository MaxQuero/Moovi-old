import React, {useEffect, useState} from 'react';
import {MovieInterface} from "../../components/Movie/Movie.interface";
import './Home.scss';
import Movie from "../../components/Movie/Movie";
import {Login} from "../../guards/Auth/Auth";
import {v4 as uuidv4} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {
    getPopularMoviesList,
    getTheatresMoviesList,
    getTrendingMediasList,
    getUpcomingMoviesList
} from "../../redux/moviesReducer";
import Search from "../../components/Search/Search";
import Carousel from "../../components/Carousel/Carousel";
import {searchMovies} from "../../helpers/ApiCalls";
import {useHistory} from "react-router-dom";
import {formatDate} from "../../helpers/Helpers";


function Home(props: any) {
    const dispatch = useDispatch();
    const popularMovies = useSelector((state: any) => state.moviesReducer.popularMovies);
    const upcomingMovies = useSelector((state: any) => state.moviesReducer.upcomingMovies);
    const theatresMovies = useSelector((state: any) => state.moviesReducer.theatresMovies);
    const trendingMedias = useSelector((state: any) => state.moviesReducer.trendingMedias);

    const [searchResultsMovies, setSearchResultsMovies] = useState([]);
    useEffect(() => {
            const session: string | null = localStorage.getItem('user');

            if (session) {
                const sessionId: string = JSON.parse(session).sessionId;
                dispatch(getPopularMoviesList());
                dispatch(getTheatresMoviesList());
                dispatch(getUpcomingMoviesList());
                dispatch(getTrendingMediasList());
            } else {
                Login().then();
            }
        }
        , []);


    const searchResultsMoviesFunc = (searchQuery: any) => {

        searchQuery ? searchMovies(searchQuery, 1)
            .then(res => {
                    setSearchResultsMovies(res);
                }
            ) : setSearchResultsMovies([])
    }

    return (
        <div className="homepage">
            <Carousel movies={popularMovies}/>

            <Search searchMovies={searchResultsMoviesFunc}/>
            {searchResultsMovies.length > 0 ?
                (<section className="movie-list section">
                    <div className="movie-list__item movie-list__results">
                        {searchResultsMovies && searchResultsMovies.map((movie: MovieInterface) => (
                            <Movie movie={movie} key={uuidv4()}/>
                        ))}
                    </div>

                </section>) :


                (<section className="movie-list section">
                    <div className="movie-list__item movie-list__trending-medias">
                        <p className="movie-list__item__title">Tendances</p>
                        {trendingMedias.length > 0 && trendingMedias.map((movie: MovieInterface, i: any) => (
                            (i < 6) && <Movie movie={movie} key={uuidv4()}/>
                        ))}
                    </div>

                    <div className="movie-list__item movie-list__in-theatres">
                        <p className="movie-list__item__title">Actuellement au cinéma</p>
                        {theatresMovies.length > 0 && theatresMovies.map((movie: MovieInterface, i: any) => (
                            (i < 6) && <Movie movie={movie} key={uuidv4()}/>
                        ))}
                    </div>

                    <div className="movie-list__item movie-list__upcoming">
                        <p className="movie-list__item__title">Films à venir</p>

                        {upcomingMovies.length > 0 && upcomingMovies.map((movie: MovieInterface, i: any) => (
                            (i < 6) && (
                                <div>
                                    <Movie movie={movie} key={uuidv4()}/>
                                    <span className="movie__release-date">
                                        { formatDate(movie.releaseDate, 'D MMMM YYYY') }
                                    </span>
                                </div>
                            )
                        ))}
                    </div>

                </section>)}

        </div>
    );
}

export default Home;