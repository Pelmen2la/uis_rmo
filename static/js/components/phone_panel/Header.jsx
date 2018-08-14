import React from 'react';
import createReactClass from 'create-react-class';
import BigTextField from './../common/BigTextField.jsx'


export default createReactClass({
    render: function() {
        const props = this.props;

        return (
            <div className="phone-panel-header">
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
        function getLabel(number) {
            if(!number || !number.toString().length) {
                return '';
            }
            return <span className="gray-text">Ввод номера...</span>;
        };
    }
});