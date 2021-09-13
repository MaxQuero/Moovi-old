import { createStore, combineReducers, applyMiddleware } from "redux";
import moviesReducer from "./moviesReducer";
import ratingsReducer from "./ratingsReducer";
import thunk from "redux-thunk";

const rootReducers = combineReducers({
    moviesReducer,
    ratingsReducer
});

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;