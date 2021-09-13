import {MovieInterface} from "../components/Movie/Movie.interface";
import {getMovieDetailsFromId, getPopularMovies} from "../helpers/ApiCalls";


const initialMovie = {
    id: '',
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
    similarMovies: []
}


const INITIAL_STATE:  {popularMovies: MovieInterface[], movieDetails: MovieInterface  } = {popularMovies: [], movieDetails: initialMovie};

function MoviesReducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "GET_POPULAR_MOVIES":
            return {state, popularMovies: action.payload}
        case "GET_MOVIE":
            return { state, movieDetails: action.payload }
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
        .catch(err => console.log('coucou'));

}

export const getMovieDetails = (movieId: string) => (dispatch: any) => {
    getMovieDetailsFromId(movieId)
        .then(movie => {
            console.log('movie details', movie);
            dispatch({
                type: "GET_MOVIE",
                payload: movie
            })
        });
}