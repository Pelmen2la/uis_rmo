import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {AppContainer} from '../components/main/AppContainer.jsx'
import reducer from './../reducers/index.js';
import {setState} from './../action_creators/index.js';
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
        mainInterfaceId: 'phone'
    })
);
