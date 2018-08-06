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
            <div>
                <AppHeader selectedItemId={props.mainInterfaceId} onMainMenuItemClick={props.changeMainInterface}/>
                <BodyContainer/>
            </div>
        </div>
    }
});


function mapStateToProps(state) {
    return {
        mainInterfaceId: state ? state.get('mainInterfaceId') : '',
    };
}

export const AppContainer = connect(mapStateToProps, actionCreators)(AppContainerClass);