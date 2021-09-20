import {MovieInterface} from "../components/Movie/Movie.interface";
import {getMovieDetailsFromId, getPopularMovies, getUserRatings, searchMovies} from "../helpers/ApiCalls";

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


const INITIAL_STATE: { popularMovies: MovieInterface[], movieDetails: MovieInterface  } = {popularMovies: [], movieDetails: initialMovie};

function MoviesReducer(state = INITIAL_STATE, action: any) {
    const movieById = (movie: MovieInterface) => movie.id === action.payload.movieId;

    switch (action.type) {
        case "GET_POPULAR_MOVIES":
            return { ...state, popularMovies: action.payload, movieDetails: initialMovie }
        case "GET_MOVIE":
            return { ...state, movieDetails: action.payload }
        case "UPDATE_RATING":
            const newArrPopular = [...state.popularMovies];
            const movieIndexToChange = newArrPopular.findIndex(movieById);
            if (movieIndexToChange !== -1) {
                newArrPopular[movieIndexToChange].rating  =  action.payload.rating;
            }

            return {
                ...state,
                popularMovies: newArrPopular,
                movieDetails: {...state.movieDetails, rating: action.payload.rating}
            }
        case "SEARCH_MOVIES":
            const newArr = action.payload;
            return {
                ...state,
                popularMovies: newArr
            }
    }

    return state;
}

export default MoviesReducer;

export const getPopularMoviesList = () => (dispatch: any) => {
    getPopularMovies()
        .then(movies => dispatch({
            type: "GET_POPULAR_MOVIES",
            payload: movies
        }))
        .catch(err => console.log(err.message));

}

export const getMovieDetails = (movieId: string, sessionId?: string) => (dispatch: any) => {
    getMovieDetailsFromId(movieId, sessionId)
        .then(movie => {
            console.log('movie details', movie);
            dispatch({
                type: "GET_MOVIE",
                payload: movie
            })
        });
}

export const getUserMovieRatings = (accountId: string, sessionId: string, movies: MovieInterface[]) => (dispatch: any) => {
    getUserRatings(accountId, sessionId)
        .then(ratings => {
            console.log('ratings', ratings);

        })
}

export const getMoviesResults = (searchQuery: string) => (dispatch: any) => {
    console.log('searchQueryyy', searchQuery);
    searchMovies(searchQuery, 1)
        .then( res => {
                console.log('resss', res);
                dispatch({
                    type: 'SEARCH_MOVIES',
                    payload: res
                })
            }
        )
}