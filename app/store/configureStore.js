import {createStore, applyMiddleware, compose} from 'redux';
import {reduxReactRouter} from 'redux-router';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import routes from '../routes';
import createHistory from 'history/lib/createBrowserHistory';

const finalCreateStore = compose(
    applyMiddleware(thunk),
    reduxReactRouter({routes, createHistory}),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
    return finalCreateStore(reducer, initialState);
}