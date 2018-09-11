import React from 'react';
import createReactClass from 'create-react-class';
import Icon from './../../common/icons/Icon.jsx'
import EditableField from './../../common/EditableField.jsx'
import BigTextField from './../../common/BigTextField.jsx'
import TagControl from './../../common/TagControl.jsx'

export default createReactClass({
    render: function() {
        const props = this.props;
        const contactData = props.contactData || {};
        return <div className="contact-form">
            {getHeader()}
            {getMainPanel(contactData)}
            <div className="bottom-inputs-container">
                <TagControl/>
                <BigTextField placeholder="Введите комментарий"/>
            </div>
        </div>;

        function getHeader() {
            return <div className="contact-form-header">
                <div className="back-btn">
                    <Icon iconPath={'common/back_icon.png'}/>
                    <span>Контакты</span>
                </div>
                <div className="status-panel">
                    <Icon iconPath={'common/call_icon.png'}/>
                    <span>Антипов Иван</span>
                </div>
            </div>
        };
        
        function getMainPanel(contactData) {
            return <div className="contact-form-main-panel">
                <Icon iconPath={'contacts_page/contact_ava_big.png'}/>
                <div className="fields-container">
                    <b>{contactData.name + ' ' + contactData.surname + ', ' + contactData.companyName}</b><br/>
                    <span className="contact-position">{contactData.position}</span>
                    <EditableField labelText="раб" value={contactData.phone} isEdit={props.isEdit} />
                    <EditableField labelText="моб" value={contactData.phone} isEdit={props.isEdit} />
                    <EditableField labelText="email" value={contactData.email} isEdit={props.isEdit} />

                    <div className="top-icon-container">
                        <Icon iconPath="contacts_page/remove_icon.png"/>
                        <Icon iconPath="contacts_page/sms_icon.png"/>
                        <Icon iconPath="contacts_page/star_empty_big.png"/>
                    </div>
                    {getEditIcon(props.isEdit)}
                </div>
            </div>
        };

        function getEditIcon(isEdit) {
            return <Icon
                imgClassName="edit-icon"
                iconPath={'contacts_page/' + (isEdit ? 'save' : 'edit') + '_icon.png'}
                onImageClick={(e) => props.changeStateFn('isEdit', !isEdit)}
            />
        };
    }
});