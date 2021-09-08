import { createStore, combineReducers } from "redux";
import MoviesReducer from "./moviesReducer";
import RatingsReducer from "./ratingsReducer";

const rootReducers = combineReducers({
    MoviesReducer,
    RatingsReducer
});

const store = createStore(rootReducers);

export default store;