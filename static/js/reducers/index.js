import {Map} from 'immutable';

function setState(state, newState) {
    return state.merge(newState);
};

function setMainInterfaceId(state, itemId) {
    return setState(state, { mainInterfaceId: itemId });
};

function setLeftPanelActiveTab(state, tabName) {
    return setState(state, { leftPanelActiveTab: tabName });
};

export default function(state=Map(), action='') {
    switch(action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case 'CHANGE_MAIN_INTERFACE':
            return setMainInterfaceId(state, action.interfaceId);
        case 'SET_LEFT_MENU_ACTIVE_TAB':
            return setLeftPanelActiveTab(state, action.tabName);
  }
};