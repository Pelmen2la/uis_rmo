import React from 'react';
import createReactClass from 'create-react-class';
import Header from './Header.jsx';
import ButtonsPanel from './ButtonsPanel.jsx';
import CallButton from './CallButton.jsx';
import TransferPanel from './TransferPanel.jsx';
import {setLeftPanelStateProperty} from "../../action_creators";

export default createReactClass({
    render: function() {
        const props = this.props;
        const stateObj = props.stateObj || {};
        const phoneNumber = stateObj.phoneNumber || '';

        return (
            <div className="phone-panel">
                <Header
                    showBackBtn={!!stateObj.customBodyType}
                    phoneNumber={phoneNumber}
                    changeStateFn={props.changeStateFn}
                />
                <div className="body-container">
                    {getBody()}
                </div>
            </div>
        );

        function onActionButtonClick(val) {
            if(val == parseInt(val)) {
                props.changeStateFn('phoneNumber', stateObj.phoneNumber.toString() + val.toString());
            } else if(val == 'transfer') {
                props.changeStateFn('customBodyType', 'transfer');
            }
        };
        function onCallButtonClick() {
            if(!stateObj.isInCall) {
                var number = props.stateObj.phoneNumber;
                fetch('/fake_data/try_get_contact_by_number/' + number).then((r) => r.json()).then(function(contactData) {
                    if(contactData.id) {
                        props.openContactEditPageFn(contactData);
                    }
                })
            }
            props.changeStateFn('isInCall', !stateObj.isInCall)
        };
        function getBody() {
            var bodyType = stateObj.customBodyType;
            if(!bodyType) {
                return getPhonePanel();
            } else if(bodyType == 'transfer') {
                return getTransferPanel();
            }
        };
        function getPhonePanel() {
            return <React.Fragment>
                <ButtonsPanel
                    buttonsType={stateObj.isInCall ? 'actions' : 'numbers'}
                    onButtonClick={onActionButtonClick}
                />
                <CallButton
                    status={stateObj.isInCall ? 'in_call' : 'not_in_call'}
                    disabled={phoneNumber.length < 4}
                    onClick={onCallButtonClick}
                />
            </React.Fragment>
        };
        function getTransferPanel() {
            return <TransferPanel contactList={stateObj.contactList} />
        };
    }
});