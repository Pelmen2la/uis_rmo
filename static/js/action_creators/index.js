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


export function setLeftPanelStateProperty(propName, val) {
    return {
        type: 'SET_LEFT_PANEL_STATE_PROPERTY',
        propName,
        val
    };
};

export function setContactsPageStateProperty(propName, val) {
    return {
        type: 'SET_CONTACTS_PAGE_STATE_PROPERTY',
        propName,
        val
    };
};