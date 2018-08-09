import React from 'react';
import createReactClass from 'create-react-class';
import LeftPanel from './../left_panel/Main.jsx'
import ContactsPage from './../pages/ContactsPage.jsx'
import ContactEditPage from './../pages/ContactEditPage.jsx'

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
                    changeStateFn={props.contactsPageChangeStateFn}
                    stateObj={props.contactsPageState}
                    openContactEditPageFn={props.openContactEditPageFn}
                />
            } else if(pageId === 'contactEdit') {
                return <ContactEditPage
                    stateObj={props.contactEditPageState}
                    changeStateFn={props.contactEditPageChangeStateFn}
                />
            } else {
                return '';
            }
        }
    }
});