import './styles.css';

import React from 'react';
import {render} from 'react-dom';

import Immutable from 'immutable';

import Root from './containers/root';
import configureStore from './store/configureStore';

import storage from './libs/storage';

import {setHistory} from './actions'

main();

function main() {
    const store = configureStore();

    const app = document.createElement('div');
    document.body.appendChild(app);

    render (
        <Root store={store} />,
        app
    );

    persist(store);
}

function persist(store) {
    const history = storage.get('history');
    store.dispatch(setHistory(history));

    store.subscribe(
        () => {
            const immutableState = Immutable.fromJS(store.getState().cats);
            const history = immutableState.get('history');
            if (history) {
                storage.set('history', history.toJS());
            }
        }
    );
}