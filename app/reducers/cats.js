import {fromJS, List, Map} from 'immutable';
import {RECEIVE_CAT, SAVE_CAT, CLOSE_CAT, SHOW_CAT, SET_HISTORY} from '../actions';

export const INITIAL_STATE = Map();

export default function cats(state = INITIAL_STATE, action = {}) {
    let newState;
    switch (action.type) {
        case SET_HISTORY:
            newState = setHistory(state, action.history);
            break;
        case RECEIVE_CAT:
            newState = receiveCat(state, action.url);
            break;
        case SAVE_CAT:
            newState = saveCat(state, action.url);
            break;
        case SHOW_CAT:
            newState = showCat(state, action.url);
            break;
        case CLOSE_CAT:
            newState = closeCat(state);
            break;
        default:
            newState = state;
            break;
    }

    return newState;
}

export function setHistory(state, history) {
    return state.set('history', List(history));
}

export function saveCat(state, url) {
    let history;
    if (state.has('history')) {
        history = state.get('history').push(url);
    } else {
        history = List.of(url);
    }

    return state.merge({
        history: history
    });
}

export function receiveCat(state, url) {
    return state.set('current', url);
}

export function showCat(state, url) {
    return state.merge({
        isCatShown: true,
        catToShow: url
    });

}

export function closeCat(state) {
    return state.delete('isCatShown').delete('catToShow');
}