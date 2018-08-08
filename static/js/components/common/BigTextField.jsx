import React from 'react';

class BigTextField extends React.Component {
    render() {
        const props = this.props;
        return (
            <div className="big-textfield-wrapper">
                <input placeholder={props.placeholder} type="text"/>
                {props.hasClearIcon ? getClearInputIcon() : ''}
            </div>
        );

        function getClearInputIcon() {
            return <img className="clear_input_icon" src="/resources/icons/common/clear_input_icon.png"/>
        }
    }
}

export default BigTextField;