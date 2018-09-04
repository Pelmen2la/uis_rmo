import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {AppContainer} from '../components/main/AppContainer.jsx'
import reducer from './../reducers/index.js';
import {setState, setLeftPanelStateProperty, setContactsPageStateProperty, setPhonePanelStateProperty,
    setAwayWindowState } from './../action_creators/index.js';
import utils from './../utils/appUtils.js';

import './../../scss/index.scss'

const store = createStore(reducer);


ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>,
    document.getElementById('Root')
);

store.dispatch(setState({
        mainPageId: 'contact',
        operatorStatusState: {
            currentStatus: 'available',
            showStatusPopup: false
        },
        leftPanelState: {
            expandedListName: 'favoriteContacts',
            callQueueGroups: [],
            expandedCallQueueGroupIds: [],
            recentCallListData: [],
            favoriteContactListData: [],
        },
        contactsPageState: {
            selectedTabName: 'contacts',
            gridData: []
        },
        contactEditPageState: {
            contactData: {},
            isCallHistoryListExpanded: true
        },
        phonePanelState: {
            phoneNumber: '',
            isInCall: false,
            customBodyType: '',
            contactList: []
        }
    })
);

loadRecentCalls();
loadContacts();
loadSalesDepartmentCalls();
loadContactsPageData();
loadCallQueueGroups();
//window.setInterval(loadRecentCalls, 2000);
//window.setInterval(loadContacts, 2500);
//window.setInterval(loadSalesDepartmentCalls, 3000);
//window.setInterval(loadContactsPageData, 3500);

function loadRecentCalls() {
    fetch('/fake_data/recent_calls').then(function(response) {
        return response.json();
    }).then(function(recentCallsList) {
        store.dispatch(setLeftPanelStateProperty('recentCallListData', recentCallsList));
    })
};

function loadCallQueueGroups() {
    fetch('/fake_data/call_queue_groups').then(function(response) {
        return response.json();
    }).then(function(callQueueGroups) {
        store.dispatch(setLeftPanelStateProperty('callQueueGroups', callQueueGroups));
    })
};

function loadContacts() {
    fetch('/fake_data/favorites_contacts').then(function(response) {
        return response.json();
    }).then(function(contactList) {
        store.dispatch(setLeftPanelStateProperty('favoriteContactListData', contactList));
        store.dispatch(setPhonePanelStateProperty('contactList', contactList));
    })
};

function loadSalesDepartmentCalls() {
    fetch('/fake_data/sales_department_calls').then(function(response) {
        return response.json();
    }).then(function(salesDepartmentCallList) {
        store.dispatch(setLeftPanelStateProperty('salesDepartmentCallList', salesDepartmentCallList));
    })
};

function loadContactsPageData() {
    fetch('/fake_data/contacts').then(function(response) {
        return response.json();
    }).then(function(contactsList) {
        store.dispatch(setContactsPageStateProperty('gridData', contactsList));
    })
};

