import React from 'react';
import createReactClass from 'create-react-class';
import LeftPanel from './../left_panel/Main.jsx'
import ContactsPage from './../pages/ContactsPage.jsx'

export default createReactClass({
    render: function() {
        const props = this.props;
        return <div className="main-container">
            <LeftPanel
                stateObj={props.leftPanelState}
                changeStateFn={props.leftPanelChangeStateFn}/>
            <div className="main-content-container">
                {getMainPageHtml(props.mainPageId)}
            </div>
        </div>;

        function getMainPageHtml(pageId) {
            if(pageId === 'contact') {
                return <ContactsPage
                    stateObj={props.contactsPageState}
                />
            } else {
                return '';
            }
        }
    }
});