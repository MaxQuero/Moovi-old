import {MovieInterface} from "../components/Movie/Movie.interface";
import {
    getMovieDetailsFromId, getMovieWatchlist,
    getPopularMovies, getTheatresMovies, getTrendingMedias,
    getUpcomingMovies,
    getUserRatings,
    searchMovies
} from "../helpers/ApiCalls";

const initialMovie = {
    id: 0,
    popularity: '',
    poster: '',
    title: '',
    synopsis: '',
    releaseDate: '',
    backdropCover: '',
    genres: [],
    originalTitle: '',
    runtime: 0,
    status: '',
    tagline:'',
    voteAverage: 0,
    voteCount: 0,
    trailer: {},
    actors: [],
    directors: [],
    recommendations: [],
    logo: {},
    rating: 0,
    favorite: false,
    watchlist: false
}

const INITIAL_STATE: {
    popularMovies: MovieInterface[],
    movieDetails: MovieInterface,
    theatresMovies: MovieInterface[],
    upcomingMovies: MovieInterface[],
    trendingMedias: MovieInterface[],
    moviesWatchlist: MovieInterface[]
} = {
    popularMovies: [],
    movieDetails: initialMovie,
    theatresMovies: [],
    upcomingMovies: [],
    trendingMedias: [],
    moviesWatchlist: []
};

function MoviesReducer(state = INITIAL_STATE, action: any) {

    switch (action.type) {
        case "GET_POPULAR_MOVIES":
            return { ...state, popularMovies: action.payload, movieDetails: initialMovie }
        case "GET_MOVIE":
            return { ...state, movieDetails: action.payload }
        case "UPDATE_RATING":
            return {
                ...state,
                popularMovies: updateMovieProperty(state.popularMovies, 'rating', action.payload),
                upcomingMovies: updateMovieProperty(state.upcomingMovies, 'rating', action.payload),
                theatresMovies: updateMovieProperty(state.theatresMovies, 'rating', action.payload),
                trendingMedias: updateMovieProperty(state.trendingMedias, 'rating', action.payload),
                movieDetails: {...state.movieDetails, rating: action.payload.rating, recommendations: updateMovieProperty(state.movieDetails.recommendations, 'rating', action.payload)}
            }
        case "UPDATE_FAVORITES":
            return {
                ...state,
                popularMovies: updateMovieProperty(state.popularMovies, 'favorite', action.payload),
                upcomingMovies: updateMovieProperty(state.upcomingMovies, 'favorite', action.payload),
                theatresMovies: updateMovieProperty(state.theatresMovies, 'favorite', action.payload),
                trendingMedias: updateMovieProperty(state.trendingMedias, 'favorite', action.payload),
                movieDetails: {...state.movieDetails, favorite: action.payload.favorite, recommendations: updateMovieProperty(state.movieDetails.recommendations, 'favorite', action.payload)},
                moviesWatchlist: updateMovieProperty(state.moviesWatchlist, 'favorite', action.payload),
            }
        case "UPDATE_WATCHLIST":
            const newArr = [...state.moviesWatchlist];
            const movieToDeleteIndex = (movie: MovieInterface) => (el: any) => el.id = movie.id;
            console.log('movie state', action.payload);
            const updatedWatchlist = action.payload.watchlist ?
                newArr.push(action.payload.movie) :
                newArr.splice(state.moviesWatchlist.findIndex(movieToDeleteIndex(action.payload.movie), 1));
            return {
                ...state,
                popularMovies: updateMovieProperty(state.popularMovies, 'watchlist', action.payload),
                upcomingMovies: updateMovieProperty(state.upcomingMovies, 'watchlist', action.payload),
                theatresMovies: updateMovieProperty(state.theatresMovies, 'watchlist', action.payload),
                trendingMedias: updateMovieProperty(state.trendingMedias, 'watchlist', action.payload),
                movieDetails: {...state.movieDetails, watchlist: action.payload.watchlist, recommendations: updateMovieProperty(state.movieDetails.recommendations, 'watchlist', action.payload)},
                moviesWatchlist: updatedWatchlist
            }
        case "SEARCH_MOVIES":
            return {
                ...state,
                resultsMovies:  action.payload
            }
        case "GET_THEATRES_MOVIES":
            return {
                ...state,
                theatresMovies: action.payload
            }
        case "GET_TRENDING_MEDIAS":
            return {
                ...state,
                trendingMedias: action.payload
            }
        case "GET_UPCOMING_MOVIES":

            return {
                ...state,
                upcomingMovies: action.payload
            }
        case "GET_MOVIES_WATCHLIST":
            return {
                ...state,
                moviesWatchlist: action.payload
            }
    }

    return state;
}

const updateMovieProperty = (movies: MovieInterface[], property: string, newValue: any) => {
    const movieById = (movie: MovieInterface) => movie.id === newValue.movieId;

    const newArr = [...movies];

    const movieIndexToChange = newArr.findIndex(movieById);
    if (movieIndexToChange !== -1) {
        // @ts-ignore
        newArr[movieIndexToChange][property] = newValue[property];
        console.log('new arr', newArr);

    }


    return newArr;

}

export default MoviesReducer;

export const getPopularMoviesList = () => async (dispatch: any) => {
    const movies = await getPopularMovies();
    dispatch({
        type: "GET_POPULAR_MOVIES",
        payload: movies
    });

}

export const getTheatresMoviesList = () => async (dispatch: any) => {
    try {
        const movies = await getTheatresMovies();
        dispatch({
            type: "GET_THEATRES_MOVIES",
            payload: movies
        });
    }
    catch(err) {
        console.error(err.message);
    }
}

export const getUpcomingMoviesList = () => async (dispatch: any) => {

    try {
        const movies = await getUpcomingMovies();
        dispatch({
            type: "GET_UPCOMING_MOVIES",
            payload: movies
        });
    }
    catch(err) {
        console.error(err.message);
    }
}

export const getTrendingMediasList = () => async (dispatch: any) => {

    try {
        const movies = await getTrendingMedias();
        dispatch({
            type: "GET_TRENDING_MEDIAS",
            payload: movies
        });
    }
    catch(err) {
        console.error(err.message);
    }
}

export const getMovieDetails = (movieId: string, sessionId?: string) => async (dispatch: any) => {
    try {
        const movie = await getMovieDetailsFromId(movieId, sessionId);
        dispatch({
            type: "GET_MOVIE",
            payload: movie
        });
    }
    catch(err) {
        console.error(err.message);
    }
}

export const getMoviesResults = (searchQuery: string) => async (dispatch: any) => {
    const searchResults: any = await searchMovies(searchQuery, 1);
    dispatch({
        type: "SEARCH_MOVIES",
        payload: searchResults
    });
}

export const getMoviesWatchlist = (accountId: number, sessionId: string, page: number = 1) => async (dispatch: any) => {
    const moviesWatchlist: any = await getMovieWatchlist(accountId, sessionId, page);
    dispatch({
        type: "GET_MOVIES_WATCHLIST",
        payload: moviesWatchlist
    });
}