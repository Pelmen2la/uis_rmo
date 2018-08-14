import React from 'react';
import createReactClass from 'create-react-class';
import Header from './Header.jsx';
import ButtonsPanel from './ButtonsPanel.jsx';
import CallButton from './CallButton.jsx';

export default createReactClass({
    render: function() {
        const props = this.props;
        const stateObj = props.stateObj || {};
        const phoneNumber = stateObj.phoneNumber || '';

        return (
            <div className="phone-panel">
                <Header
                    phoneNumber={phoneNumber}
                    changeStateFn={props.changeStateFn}
                />
                <ButtonsPanel
                    buttonsType={stateObj.isInCall ? 'actions' : 'numbers'}
                    onButtonClick={onActionButtonClick}
                />
                <CallButton
                    status={stateObj.isInCall ? 'in_call' : 'not_in_call'}
                    disabled={phoneNumber.length < 4}
                    onClick={onCallButtonClick}
                />
            </div>
        );

        function onActionButtonClick(val) {
            if(val == parseInt(val)) {
                props.changeStateFn('phoneNumber', stateObj.phoneNumber.toString() + val.toString());
            }
        };
        function onCallButtonClick() {
            props.changeStateFn('isInCall', !stateObj.isInCall)
        };
    }
});