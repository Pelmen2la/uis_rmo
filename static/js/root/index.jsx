import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {AppContainer} from '../components/main/AppContainer.jsx'
import reducer from './../reducers/index.js';
import {setState, setLeftPanelStateProperty, setContactsPageStateProperty} from './../action_creators/index.js';
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
        mainInterfaceId: 'phone',
        leftPanelState: {
            activeTab: 'contacts',
            isRecentCallsListExpanded: true,
            recentCallList: [],
            isFavoritesContactListExpanded: true,
            favoritesContactList: [],
            isSalesDepartmentCallListExpanded: true,
            salesDepartmentCallList: []
        },
        contactsPageState: {
            gridData: []
        }
    })
);

loadRecentCalls();
loadFavoritesContacts();
loadSalesDepartmentCalls();
loadContactsPageData();
window.setInterval(loadRecentCalls, 2000);
window.setInterval(loadFavoritesContacts, 2500);
window.setInterval(loadSalesDepartmentCalls, 3000);
//window.setInterval(loadContactsPageData, 3500);

function loadRecentCalls() {
    fetch('/fake_data/recent_calls').then(function(response) {
        return response.json();
    }).then(function(recentCallsList) {
        store.dispatch(setLeftPanelStateProperty('recentCallList', recentCallsList));
    })
};

function loadFavoritesContacts() {
    fetch('/fake_data/favorites_contacts').then(function(response) {
        return response.json();
    }).then(function(favoritesContactList) {
        store.dispatch(setLeftPanelStateProperty('favoritesContactList', favoritesContactList));
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

