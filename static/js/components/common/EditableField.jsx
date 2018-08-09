import React from 'react';

class EditableField extends React.Component {
    render() {
        const props = this.props;
        return (
            <div className={'editable-field-wrapper ' + (props.isEdit ? 'edit-mode' : '')}>
                {props.labelText ? getLabel(props.labelText) : null}
                {props.isEdit ? getEditField(props.value) : <span>{props.value}</span>}
            </div>
        );

        function getLabel(text) {
            return <label>
                {text + ':'}
            </label>
        };

        function getEditField(value) {
            return <input type="text" defaultValue={value}/>;
        };
    }
}

export default EditableField;