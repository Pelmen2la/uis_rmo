export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function setMainPageId(interfaceId) {
    return {
        type: 'SET_MAIN_PAGE_ID',
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

export function openContactEditPage(contactData) {
    return {
        type: 'OPEN_CONTACT_EDIT_PAGE',
        contactData
    };
};

export function setContactsEditPageStateProperty(propName, val) {
    return {
        type: 'SET_CONTACT_EDIT_PAGE_STATE_PROPERTY',
        propName,
        val
    };
};

export function setPhonePanelStateProperty(propName, val) {
    return {
        type: 'SET_PHONE_PANEL_STATE_PROPERTY',
        propName,
        val
    };
};

export function setOperatorStatusState(propName, val) {
    return {
        type: 'SET_OPERATOR_STATUS_STATE',
        propName,
        val
    };
};

export function setIncomingCallsState(propName, val) {
    return {
        type: 'SET_INCOMING_CALLS_STATE',
        propName,
        val
    };
};