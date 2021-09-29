import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getPopularMoviesList,
    getTheatresMoviesList,
    getTrendingMediasList,
    getUpcomingMoviesList,
    getMoviesWatchlist
} from "../../redux/moviesReducer";
import {Login} from "../../guards/Auth/Auth";
import {MovieInterface} from "../../components/Movie/Movie.interface";
import "./Watchlist.scss";
import {formatDate} from "../../helpers/Helpers";
import {FaHeart} from "react-icons/fa";

interface Props {

}

function Watchlist(props: Props) {
    const dispatch = useDispatch();
    const moviesWatchlist = useSelector((state: any) => state.moviesReducer.moviesWatchlist);

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

    return (<div className="watchlist">
        <h1 className="watchlist__title">Ma watchlist</h1>
        <div className="watchlist__tabs">
            <div className="watchlist__tab-item">Films</div>
            <div className="watchlist__tab-item">Séries TV</div>
        </div>
        { moviesWatchlist && moviesWatchlist.map((movie: MovieInterface) =>
            (<div className="watchlist__item media-item">
                <img className="media-item__poster" src={movie.poster}/>
                <div className="media-item__desc">
                    <p className="media-item__title">{movie.title}</p>
                    <p className="media-item__tagline">{movie.tagline}</p>
                    <p className="media-item__release">{formatDate(movie.releaseDate, "d MMMM YYYY")}</p>
                    <p className="media-item__synopsis">{movie.synopsis}</p>

                   <p className="media-item__rating">{movie.rating ? movie.rating : "?"}</p>
                    <FaHeart className={movie.favorite ? "fa-heart active" : "fa-heart"}/>
                   <p className="media-item__watchlist">{movie.watchlist}</p>
                </div>
            </div>)
        )}

    </div> )

}

export default Watchlist;