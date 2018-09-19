import React from 'react';
import createReactClass from 'create-react-class';
import ContactForm from './contacts/ContactForm.jsx'
import Icon from './../common/icons/Icon.jsx'
import StatusIcon from './../common/icons/StatusIcon.jsx'
import CallsGrid from './contacts/CallsGrid.jsx'
import ExpansionPanel from './../common/ExpansionPanel.jsx'

export default createReactClass({
    render: function() {
        const props = this.props;
        const stateObj = props.stateObj;
        return <div className="main-page-container contact-edit-page">
            <ContactForm
                setMainPageIdFn={props.setMainPageIdFn}
                isEdit={stateObj.isEdit}
                contactData={stateObj.contactData}
                changeStateFn={props.changeStateFn}
            />
            <ExpansionPanel
                isExpanded={stateObj.isCallHistoryListExpanded}
                headerText="История вызовов"
                content={getGridCfg()}
                onHeaderClick={() => props.changeStateFn('isCallHistoryListExpanded', !stateObj.isCallHistoryListExpanded)}
            />
        </div>;

        function getGridCfg() {
            return <div className="calls-grid-container">
                <CallsGrid
                    data={stateObj.contactData.callsHistory || []}
                />
            </div>
        };
    }
});