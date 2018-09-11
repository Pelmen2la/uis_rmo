import React from 'react';
import createReactClass from 'create-react-class';
import Icon from './../common/icons/Icon.jsx'

export default createReactClass({
    render: function() {
        const props = this.props;
        const callIcon = props.hasCallIcon ? getCallIcon() : '';
        return (
            <ul className="call-list">
                {props.callList.map(getCallHtml)}
            </ul>
        );

        function getCallHtml(call) {
            var imgName = call.direction === 'in' ? 'incomig' : 'outgoing';
            return <li key={call.id}>
                <Icon iconPath={'common/' + imgName + '_call.png'}/>
                <span>{call.showName ? (call.name + ' ' + call.surname) : call.phone}</span>
                {callIcon}
                <span className="time">{ call.time }</span>
            </li>
        };

        function getCallIcon() {
            return <span className="call-icon small-list-full-height-btn"></span>
        };
    }
});