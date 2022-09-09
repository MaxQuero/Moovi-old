import { createStore, combineReducers, applyMiddleware } from 'redux';
import mediasReducer from './mediasReducer';
import thunk from 'redux-thunk';

const rootReducers = combineReducers({
  mediasReducer,
});

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;
