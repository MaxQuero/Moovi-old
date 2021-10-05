import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMoviesWatchlist} from "../../redux/moviesReducer";
import {Login} from "../../guards/Auth/Auth";
import {MovieInterface} from "../../components/Movie/Movie.interface";
import "./Watchlist.scss";
import {formatDate, setMovieToFavoritesAction, setMovieToWatchListAction} from "../../helpers/Helpers";
import Favorite from "../../components/Favorite/Favorite";
import {watch} from "fs";

interface Props {

}

function Watchlist(props: Props) {
    const dispatch = useDispatch();
    const moviesWatchlist = useSelector((state: any) => state.moviesReducer.moviesWatchlist);
    const tvShowWatchlist = useSelector((state: any) => state.tvShowReducer.tvShowWatchlist);
    const [watchlist, setWatchlist] = useState([...moviesWatchlist, ...tvShowWatchlist]);

    const setMovieToFavorites = (async (movie: MovieInterface, isFavorite: boolean) => {
        await setMovieToFavoritesAction(movie, isFavorite, dispatch);
    });

    const setMovieToWatchlist = (async(movie: MovieInterface, isWatchlisted: boolean) => {
        await setMovieToWatchListAction(movie, isWatchlisted, dispatch);
    });


    useEffect(() => {
            console.log('effected');
            const session: string | null = localStorage.getItem('user');

            if (session) {
                const sessionId: string = JSON.parse(session).sessionId;
                const accountId: number = JSON.parse(session).id;
                dispatch(getMoviesWatchlist(accountId, sessionId));
            } else {
                Login().then();
            }
        }
        , []);

    const filterMoviesWatchlist = () => {
        setWatchlist(moviesWatchlist);
    }

    return (<div className="watchlist">
        <h1 className="watchlist__title">Ma watchlist</h1>
        <div className="watchlist__tabs">
            <div className="watchlist__tab-item" onClick={filterMoviesWatchlist}>Films</div>
            <div className="watchlist__tab-item">Séries TV</div>
        </div>
        { moviesWatchlist && moviesWatchlist.map((movie: MovieInterface) =>
            (<div className="watchlist__item media-item">
                <img className="media-item__poster" src={movie.poster}/>
                <div className="media-item__desc">
                    <p className="media-item__title">{movie.title}</p>
                    <p className="media-item__release">{formatDate(movie.releaseDate, "d MMMM YYYY")}</p>
                    <p className="media-item__synopsis">{movie.synopsis}</p>

                    <div className="media-item__actions">
                        <p className="media-item__rating">{movie.rating ? movie.rating : "?"}</p>
                        <Favorite className="media-item__favorite" rounded setMovieToFavoriteFunc={setMovieToFavorites} movie={movie} />
                        <p className="media-item__watchlist">{movie.watchlist}</p>
                    </div>

                </div>
            </div>)
        )}

    </div> )

}

export default Watchlist;