import React from 'react';
import createReactClass from 'create-react-class';
import BigTextField from './../common/BigTextField.jsx'
import Icon from './../common/icons/Icon.jsx'


export default createReactClass({
    render: function() {
        const props = this.props;

        return (
            <div className="phone-panel-header">
                {props.showBackBtn ? getBackBtnImage() : ''}
                <BigTextField
                    hasClearIcon={true}
                    value={props.phoneNumber}
                    onInputChange={onPhoneInputChange}
                    onClearButtonClick={onPhoneClearButtonClick}
                />
                {getLabel(props.phoneNumber)}
            </div>
        );

        function onPhoneInputChange(e) {
            props.changeStateFn('phoneNumber', e.target.value);
        };
        function onPhoneClearButtonClick() {
            props.changeStateFn('phoneNumber', '');
        };
        function getBackBtnImage() {
            return <Icon iconPath="common/back_icon.png" imgClassName="back-button" onImageClick={onBackIconClick}/>;
        };
        function onBackIconClick() {
            props.changeStateFn('customBodyType', '');
        };
        function getLabel(number) {
            if(!number || !number.toString().length) {
                return '';
            }
            return <span className="gray-text">Ввод номера...</span>;
        };
    }
});