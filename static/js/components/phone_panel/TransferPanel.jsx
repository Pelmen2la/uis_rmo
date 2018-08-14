import React from 'react';
import createReactClass from 'create-react-class';
import SmallContactList from './../common/SmallContactList.jsx';

export default createReactClass({
    render: function() {
        const props = this.props;

        return (
            <SmallContactList
                contactList={props.contactList}
                rightButtonHtml={getTransferButton()}
            />
        );

        function getTransferButton() {
            return <span className="small-list-full-height-btn do-transfer-button"></span>
        }
    }
});