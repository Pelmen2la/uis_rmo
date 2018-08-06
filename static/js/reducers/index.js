import {Map} from 'immutable';
import utils from '../utils/appUtils.js';

function setState(state, newState) {
    return state.merge(newState);
};

function changeDotsCount(state, cardId, changeValue) {
    var oldValue = (utils.getItemPropertyCache(cardId, 'userDotsCount') || 0);
    socket.emit('changeDotsCount', state.get('statId'), { cardId: cardId, changeValue: changeValue });
    utils.setItemProperty(state, 'cards', cardId, 'userDotsCount', oldValue + changeValue, true);
    return state;
};

function addDot(state, cardId) {
    return changeDotsCount(state, cardId, 1);
};

function removeDot(state, cardId) {
    return changeDotsCount(state, cardId, -1);
};

export default function(state=Map(), action='') {
    switch(action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case 'ADD_DOT':
            return addDot(state, action.cardId);
        case 'REMOVE_DOT':
            return removeDot(state, action.cardId);
  }
};