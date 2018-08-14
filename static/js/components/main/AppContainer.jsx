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
                contactEditPageState={props.contactEditPageState}
                openContactEditPageFn={props.openContactEditPage}
                contactEditPageChangeStateFn={props.setContactsEditPageStateProperty}
                phonePanelState={props.phonePanelState}
                phonePanelChangeStateFn={props.setPhonePanelStateProperty}
            />
        </div>
    }
});


function mapStateToProps(state) {
    return {
        mainPageId: getStateString(state, 'mainPageId'),
        leftPanelState: state ? state.get('leftPanelState').toJS() : state,
        contactsPageState: state ? state.get('contactsPageState').toJS() : state,
        contactEditPageState: state ? state.get('contactEditPageState').toJS() : state,
        phonePanelState: state ? state.get('phonePanelState').toJS() : state
    };
}

function getStateString(state, propName) {
    return state ? state.get(propName) : '';
}

export const AppContainer = connect(mapStateToProps, actionCreators)(AppContainerClass);