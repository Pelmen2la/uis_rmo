import React from 'react';
import createReactClass from 'create-react-class';
import AppHeader from './Header.jsx'
import BodyContainer from './BodyContainer.jsx'
import {connect} from 'react-redux';
import * as actionCreators from './../../action_creators/index.js';

const AppContainerClass = createReactClass({
    render: function() {
        var props = this.props;
        return <div className="app-container">
            <AppHeader
                selectedItemId={props.mainPageId}
                onMainMenuItemClick={props.setMainPageId}
            />
            <BodyContainer
                mainPageId={props.mainPageId}
                leftPanelState={props.leftPanelState}
                leftPanelChangeStateFn={props.setLeftPanelStateProperty}
                contactsPageState={props.contactsPageState}
                contactsPageChangeStateFn={props.setContactsPageStateProperty}
            />
        </div>
    }
});


function mapStateToProps(state) {
    return {
        mainPageId: getStateString(state, 'mainPageId'),
        leftPanelState: state ? state.get('leftPanelState').toJS() : state,
        contactsPageState: state ? state.get('contactsPageState').toJS() : state,
    };
}

function getStateString(state, propName) {
    return state ? state.get(propName) : '';
}

export const AppContainer = connect(mapStateToProps, actionCreators)(AppContainerClass);