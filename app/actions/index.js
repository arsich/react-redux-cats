import fetch from 'isomorphic-fetch';

export const SET_HISTORY = 'SET_HISTORY';

export const REQUEST_NEXT_CAT = 'REQUEST_NEXT_CAT';
export const RECEIVE_CAT = 'RECEIVE_CAT';
export const SAVE_CAT = 'SAVE_CAT';

export const SHOW_CAT = 'SHOW_CAT';
export const CLOSE_CAT = 'CLOSE_CAT';

// no json on The Cat Api
const CAT_API_URL = 'http://arsich.ru/getCat/';

export function requestNextCat() {
    return dispatch => {
        return fetch(CAT_API_URL)
            .then(response => response.json())
            .then(json => dispatch(receiveCat(json.url)));
    };
}

export function setHistory(history) {
    return {
        type: SET_HISTORY,
        history: history
    };
}

export function receiveCat(url) {
    return {
        type: RECEIVE_CAT,
        url: url
    };
}

export function saveCat(url) {
    return {
        type: SAVE_CAT,
        url: url
    };
}

export function showCat(url) {
    return {
        type: SHOW_CAT,
        url: url
    };
}

export function closeCat(url) {
    return {
        type: CLOSE_CAT,
        url: url
    };
}