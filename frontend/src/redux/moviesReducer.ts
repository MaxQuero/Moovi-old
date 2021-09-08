import {MovieInterface} from "../components/Movie/Movie.interface";

const INITIAL_STATE:  {movies: MovieInterface | MovieInterface[]  } = {movies: []};

function MoviesReducer(state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "GET_LIST_MOVIES":
            return {state, movies: action.payload}
        case "GET_MOVIE":
            return { state, movies: action.payload }

    }
}

export default MoviesReducer;