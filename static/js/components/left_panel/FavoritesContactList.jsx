import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
    render: function() {
        return (
            <ul className="favorites-contact-list">
                {this.props.contactList.map(getContactHtml)}
            </ul>
        );

        function getContactHtml(contact) {
            return <li key={contact.id}>
                <img src={'/resources/icons/left_panel/' + contact.status + '_status.png'}/>
                <span>{contact.name + ' ' + contact.surname}</span>
                {getIsInCallIconHtml(contact)}
            </li>
        }

        function getIsInCallIconHtml(contact) {
            if(contact.status !== 'unknown') {
                return <img className="is-in-call-icon"
                            src={'/resources/icons/left_panel/' + contact.isInCall + '_icon.png'}/>
            } else {
                return '';
            }
        }
    }
});