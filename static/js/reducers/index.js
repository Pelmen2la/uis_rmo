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
    contactsPageState[propName] = val;
    return setState(state, { contactsPageState: contactsPageState });
};

function openContactEditPage(state, contactData) {
    var state = setContactsEditPageStateProperty(state, 'contactData', contactData);
    return setMainPageId(state, 'contactEdit');
};

function setContactsEditPageStateProperty(state, propName, val) {
    var contactEditPageState = state.get('contactEditPageState').toJS();
    contactEditPageState[propName] = val;
    return setState(state, { contactEditPageState: contactEditPageState });
};


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
  }
};