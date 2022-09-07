import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Login} from "../../guards/Auth/Auth";
import "./Watchlist.scss";
import {
    formatDate,
    getMediasWatchlist,
    rateMediaAction,
    setMediaToFavoritesAction,
    setMediaToWatchListAction
} from "../../helpers/Helpers";
import Favorite from "../../components/Favorite/Favorite";
import {MovieInterface} from "../../interfaces/Movie.interface";
import Trash from "../../components/Trash/Trash";
import Stars from "../../components/Stars/Stars";
import {v4 as uuidv4} from "uuid";
import Media from "../../components/Media/Media";
import {MediaEnum} from "../../interfaces/Media.interface";
import {TvShowInterface} from "../../interfaces/TvShow.interface";
import ToggleButton from "../../components/ToggleButton/ToggleButton";

interface Props {


}

function Watchlist(props: Props) {
    const dispatch = useDispatch();
    const watchlist = useSelector((state: any) => state.mediasReducer.mediasWatchlist);

    const [watchlistFiltered, setWatchlistFiltered] = useState([]);
    const rateMedia = (async (media: MovieInterface | TvShowInterface, rating: number) => {
        await rateMediaAction(media, rating, dispatch);
    });

    const setMediaToFavorites = (async (media: MovieInterface | TvShowInterface, isFavorite: boolean) => {
        await setMediaToFavoritesAction(media, isFavorite, dispatch);
    });

    const deleteMediaFromWatchlist = (async(media: MovieInterface | TvShowInterface, isWatchlisted: boolean) => {
        await setMediaToWatchListAction(media,  isWatchlisted, dispatch);
    });

    useEffect(() => {
            const session: string | null = localStorage.getItem('user');

            if (session) {
                const sessionId: string = JSON.parse(session).sessionId;
                const accountId: number = JSON.parse(session).id;
                dispatch(getMediasWatchlist(MediaEnum.Movie, accountId, sessionId));
                dispatch(getMediasWatchlist(MediaEnum.Tv, accountId, sessionId));

            } else {
                Login().then();
            }
        }

        , []);

    useEffect(() => {
        setWatchlistFiltered(watchlist.movie);
    }, [watchlist.movie]);

    useEffect(() => {
        setWatchlistFiltered(watchlist.tv);
    }, [watchlist.tv]);

    const filterMediasWatchlist = (mediaType: MediaEnum) => {
        switch (mediaType) {
            case MediaEnum.Movie:
                setWatchlistFiltered(watchlist.movie)
                break;
            case MediaEnum.Tv:
                setWatchlistFiltered(watchlist.tv)
                break;
        }
    }

    return (
        <div className="watchlist">
            <h1 className="watchlist__title">Ma watchlist</h1>
            <div className="watchlist__tabs">
                <ToggleButton config={[MediaEnum.Movie, MediaEnum.Tv]}
                              selectedItem={watchlistFiltered === watchlist.movie ? MediaEnum.Movie : MediaEnum.Tv}
                              setElementsFilteredFunc={filterMediasWatchlist}
                >
                    { watchlistFiltered.length > 0 && watchlistFiltered.map((movie: MovieInterface) =>
                        (<div className="watchlist__item media-item" key={uuidv4()}>
                                <Media className="media-item__media" media={movie}/>
                                <div className="media-item__desc">
                                    <p className="media-item__title">{movie.title}</p>
                                    <p className="media-item__release">{formatDate(movie.releaseDate, "d MMMM YYYY")}</p>
                                    <p className="media-item__synopsis">{movie.synopsis}</p>
                                    <div className="media-item__actions">
                                        <Favorite className="media-item__favorite" rounded setMovieToFavoriteFunc={setMediaToFavorites} media={movie} />
                                        <Trash rounded deleteMovieFromWatchlistFunc={deleteMediaFromWatchlist} media={movie} className="media-item__watchlist" />
                                        <Stars starsToDisplay={10} className="media-item__rating" reversed rateMediaFunc={rateMedia} media={movie} />
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </ToggleButton>
            </div>
    </div> )
}

export default Watchlist;