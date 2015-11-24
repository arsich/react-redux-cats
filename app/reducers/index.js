import {combineReducers} from 'redux';
import cats from './cats';
import { routerStateReducer as router } from 'redux-router';

const rootReducer = combineReducers({
    cats,
    router
});

export default rootReducer;