import {Map} from 'immutable';

function setState(state, newState) {
    return state.merge(newState);
};

function setMainPageId(state, itemId) {
    return setState(state, { mainPageId: itemId });
};

function setLeftPanelStateProperty(state, propName, val) {
    var leftPanelState = state.get('leftPanelState').toJS();
    leftPanelState[propName] = val;
    return setState(state, { leftPanelState: leftPanelState });
};

function setContactsPageStateProperty(state, propName, val) {
    var contactsPageState = state.get('contactsPageState').toJS();
    contactsPageState = setStateProp(contactsPageState, propName, val);
    return setState(state, { contactsPageState: contactsPageState });
};

function openContactEditPage(state, contactData) {
    var state = setContactsEditPageStateProperty(state, 'contactData', contactData);
    return setMainPageId(state, 'contactEdit');
};

function setContactsEditPageStateProperty(state, propName, val) {
    var contactEditPageState = state.get('contactEditPageState').toJS();
    contactEditPageState = setStateProp(contactEditPageState, propName, val);
    return setState(state, { contactEditPageState: contactEditPageState });
};

function setPhonePanelStateProperty(state, propName, val) {
    var phonePanelState = state.get('phonePanelState').toJS();
    phonePanelState[propName] = val;
    return setState(state, { phonePanelState: phonePanelState });
};

function setOperatorStatusState(state, propName, val) {
    var operatorStatusState = state.get('operatorStatusState').toJS();
    operatorStatusState[propName] = val;
    return setState(state, { operatorStatusState: operatorStatusState });
};

function setIncomingCallsState(state, propName, val) {
    var incomingCallsState = state.get('incomingCallsState').toJS();
    incomingCallsState[propName] = val;
    return setState(state, { incomingCallsState: incomingCallsState });
};

function setStateProp(state, propName, val) {
    if(propName.indexOf('.') === -1) {
        state[propName] = val;
    } else {
        const path = propName.split('.');
        var target = state;
        for(var i = 0; i < path.length - 1; i++) {
            target = target[path[i]];
        }
        target[path[path.length - 1]] = val;
    }
    return state;
}

export default function(state=Map(), action='') {
    switch(action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case 'SET_MAIN_PAGE_ID':
            return setMainPageId(state, action.interfaceId);
        case 'SET_LEFT_PANEL_STATE_PROPERTY':
            return setLeftPanelStateProperty(state, action.propName, action.val);
        case 'SET_CONTACTS_PAGE_STATE_PROPERTY':
            return setContactsPageStateProperty(state, action.propName, action.val);
        case 'OPEN_CONTACT_EDIT_PAGE':
            return openContactEditPage(state, action.contactData);
        case 'SET_CONTACT_EDIT_PAGE_STATE_PROPERTY':
            return setContactsEditPageStateProperty(state, action.propName, action.val);
        case 'SET_PHONE_PANEL_STATE_PROPERTY':
            return setPhonePanelStateProperty(state, action.propName, action.val);
        case 'SET_OPERATOR_STATUS_STATE':
            return setOperatorStatusState(state, action.propName, action.val);
        case 'SET_INCOMING_CALLS_STATE':
            return setIncomingCallsState(state, action.propName, action.val);
  }
};