import React from 'react';
import createReactClass from 'create-react-class';
import LeftPanel from './../left_panel/Main.jsx'

export default createReactClass({
    render: function() {
        const props = this.props;
        return <div className="main-container">
            <LeftPanel
                stateObj={props.leftPanelState}
                changeStateFn={props.leftPanelChangeStateFn}>
            </LeftPanel>
        </div>
    }
});