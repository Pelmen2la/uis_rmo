import React from 'react';
import createReactClass from 'create-react-class';
import Icon from "./../common/icons/Icon.jsx";


export default createReactClass({
    render: function() {
        const props = this.props;

        return (
            <button className="call-button" onClick={props.onClick} disabled={props.disabled}>
                <Icon iconPath={getIconPath(props.status)}/>
            </button>
        );

        function getIconPath(status) {
            return 'phone_panel/' + (status === 'in_call' ? 'stop_call_button' : 'call_button') + '.png';
        };
    }
});