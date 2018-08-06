export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function addDot(cardId) {
    return {
        type: 'ADD_DOT',
        cardId
    };
}

export function removeDot(cardId) {
    return {
        type: 'REMOVE_DOT',
        cardId
    };
}