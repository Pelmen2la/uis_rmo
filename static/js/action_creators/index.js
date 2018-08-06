export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}


export function changeMainInterface(interfaceId) {
    return {
        type: 'CHANGE_MAIN_INTERFACE',
        interfaceId
    };
};