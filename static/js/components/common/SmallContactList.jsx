import React from 'react';
import createReactClass from 'create-react-class';

export default createReactClass({
    render: function() {
        var props = this.props;

        return (
            <ul className="small-contact-list">
                {this.props.contactList.map(getContactHtml)}
            </ul>
        );

        function getContactHtml(contact) {
            return <li key={contact.id}>
                <img src={'/resources/icons/common/' + contact.status + '_status.png'}/>
                {getIsInCallIconHtml(contact)}
                <span>{contact.name + ' ' + contact.surname}</span>
                {props.rightButtonHtml ? props.rightButtonHtml : ''}
            </li>
        }

        function getIsInCallIconHtml(contact) {
            var imageName = contact.status !== 'unknown' ? contact.isInCall : 'unknown',
                src = '/resources/icons/common/' + imageName + '_icon.png';
            return <img className="is-in-call-icon" src={src}/>
        }
    }
});