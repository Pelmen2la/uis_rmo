import React from 'react';
import createReactClass from 'create-react-class';
import ContactForm from './ContactForm.jsx'

export default createReactClass({
    render: function() {
        const props = this.props;
        const stateObj = props.stateObj;
        return <div className="main-page-container contact-edit-page">
            <ContactForm
                isEdit={stateObj.isEdit}
                contactData={stateObj.contactData}
                changeStateFn={props.changeStateFn}
            />
        </div>;
    }
});