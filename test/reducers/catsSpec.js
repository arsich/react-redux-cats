import {List, Map} from 'immutable';
import {expect} from 'chai';

import reducer, {setHistory, saveCat, receiveCat, showCat, closeCat} from '../../app/reducers/cats';

describe('application logic:', () => {
    describe('setHistory:', () => {
        it('add the entries to the history', () => {
            const state = Map();
            const entries = ['Tom', 'Garfield'];
            const nextState = setHistory(state, entries);

            expect(nextState).to.equal(Map({
                history: List.of('Tom', 'Garfield')
            }));
        });
    });
    describe('save cat:', () => {
        it('move current cat to history', () => {
            const state = Map({
                history: List.of('Tom', 'Garfield')
            });
            const newState = saveCat(state, 'Grumpy cat');
            expect(newState).to.equal(Map({
                history: List.of('Tom', 'Garfield', 'Grumpy cat')
            }));
        });

        it('create history if it is empty', () => {
            const state = Map();

            const newState = saveCat(state, 'Grumpy cat');
            expect(newState).to.equal(Map({
                history: List.of('Grumpy cat')
            }));
        });
    });
    describe('receive cat:', () => {
        it('change current cat', () => {
            const state = Map({
                history: List.of('Tom', 'Garfield'),
                current: 'Grumpy cat'
            });

            const newState = receiveCat(state, 'Lil Bub');
            expect(newState).to.equal(Map({
                history: List.of('Tom', 'Garfield'),
                current: 'Lil Bub'
            }));
        });
    });
    describe('show cat:', () => {
        it('show selected cat', () => {
            const state = Map({
                history: List.of('Tom', 'Garfield'),
                current: 'Grumpy cat'
            });

            const newState = showCat(state, 'Tom');
            expect(newState).to.equal(Map({
                history: List.of('Tom', 'Garfield'),
                current: 'Grumpy cat',
                isCatShown: true,
                catToShow: 'Tom'
            }));
        });
    });
    describe('close cat:', () => {
        it('close showing cat', () => {
            const state = Map({
                history: List.of('Tom', 'Garfield'),
                current: 'Grumpy cat',
                isCatShown: true,
                catToShow: 'Tom'
            });

            const newState = closeCat(state, 'Tom');
            expect(newState).to.equal(Map({
                history: List.of('Tom', 'Garfield'),
                current: 'Grumpy cat'
            }));
        });
    });

});
