import {Map} from 'immutable';

function setState(state, newState) {
    return state.merge(newState);
};

function setMainInterfaceId(state, itemId) {
    return setState(state, { mainInterfaceId: itemId });
};

function setLeftPanelStateProperty(state, propName, val) {
    var leftPanelState = state.get('leftPanelState').toJS();
    leftPanelState[propName] = val;
    return setState(state, { leftPanelState: leftPanelState });
};

export default function(state=Map(), action='') {
    switch(action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case 'CHANGE_MAIN_INTERFACE':
            return setMainInterfaceId(state, action.interfaceId);
        case 'SET_LEFT_PANEL_STATE_PROPERTY':
            return setLeftPanelStateProperty(state, action.propName, action.val);
  }
};