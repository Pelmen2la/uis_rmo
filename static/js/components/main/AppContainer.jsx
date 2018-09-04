import React from 'react';
import createReactClass from 'create-react-class';
import AppHeader from './Header.jsx'
import BodyContainer from './BodyContainer.jsx'
import AwayWindow from './AwayWindow.jsx'
import {connect} from 'react-redux';
import * as actionCreators from './../../action_creators/index.js';

const AppContainerClass = createReactClass({
    render: function() {
        var props = this.props;

        return <React.Fragment>
            <AppHeader
                operatorStatusState={props.operatorStatusState}
                setOperatorStatusStateFn={props.setOperatorStatusState}
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
            {this.getAwayWindow()}
        </React.Fragment>
    },

    getAwayWindow: function() {
        var props = this.props,
            operatorState = props.operatorStatusState;
        if(!operatorState || ['available', 'do_not_disturb'].indexOf(operatorState.currentStatus) > -1) {
            return '';
        }
        return <AwayWindow
            setOperatorStatusFn={(status) => props.setOperatorStatusState('currentStatus', status)}
            currentStatus={props.operatorStatusState.currentStatus}
        />
    }
});


function mapStateToProps(state) {
    return {
        mainPageId: getStateString(state, 'mainPageId'),
        operatorStatusState: getStateToJsObj(state, 'operatorStatusState'),
        leftPanelState: getStateToJsObj(state, 'leftPanelState'),
        contactsPageState: getStateToJsObj(state, 'contactsPageState'),
        contactEditPageState: getStateToJsObj(state, 'contactEditPageState'),
        phonePanelState: getStateToJsObj(state, 'phonePanelState')
    };
}

function getStateString(state, propName) {
    return state ? state.get(propName) : '';
}

function getStateToJsObj(state, propName) {
    return state ? state.get(propName).toJS() : state;
}

export const AppContainer = connect(mapStateToProps, actionCreators)(AppContainerClass);