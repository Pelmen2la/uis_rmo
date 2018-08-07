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

export function setLeftPanelActiveTab(tabName) {
    return {
        type: 'SET_LEFT_MENU_ACTIVE_TAB',
        tabName
    };
};

export function setLeftPanelRecentCallListExpanded(isExpanded) {
    return {
        type: 'SET_LEFT_PANEL_CALL_LIST_EXPANDED',
        isExpanded
    };
};