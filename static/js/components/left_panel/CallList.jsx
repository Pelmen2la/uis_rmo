import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
    render: function() {
        const props = this.props;
        const callIcon = props.hasCallIcon ? getCallIcon() : '';
        debugger;
        return (
            <ul className="call-list">
                {props.callList.map(getCallHtml)}
            </ul>
        );

        function getCallHtml(call) {
            return <li key={call.id}>
                <img src={'/resources/icons/left_panel/' + call.direction + '_call.png'}/>
                <span>{call.showName ? (call.name + ' ' + call.surname) : call.phone}</span>
                {callIcon}
                <span className="time">{ call.time }</span>
            </li>
        };

        function getCallIcon() {
            return <span className="call-icon"></span>
        };
    }
});