import React from 'react';

class BigTextField extends React.Component {
    render() {
        const props = this.props;
        return (
            <div className="big-textfield-wrapper">
                <input placeholder={props.placeholder} type="text" value={props.value || ''} onChange={props.onInputChange}/>
                {props.hasClearIcon ? getClearInputIcon(props.onClearButtonClick) : ''}
            </div>
        );

        function getClearInputIcon(onClickFn) {
            return <img className="clear_input_icon" src="/resources/icons/common/clear_input_icon.png" onClick={onClickFn}/>
        };
    }

}

export default BigTextField;