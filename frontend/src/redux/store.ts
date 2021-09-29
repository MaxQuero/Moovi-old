import { createStore, combineReducers, applyMiddleware } from "redux";
import moviesReducer from "./moviesReducer";
import thunk from "redux-thunk";

const rootReducers = combineReducers({
    moviesReducer
});

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;