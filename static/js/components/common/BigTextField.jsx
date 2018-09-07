import React from 'react';

class BigTextField extends React.Component {
    render() {
        const props = this.props;
        return (
            <div className="big-textfield-wrapper">
                <input placeholder={props.placeholder} type="text" value={props.value || ''} onChange={this.onInputChange.bind(this)}/>
                {props.hasClearIcon ? getClearInputIcon(props.onClearButtonClick) : ''}
            </div>
        );

        function getClearInputIcon(onClickFn) {
            return <img className="clear_input_icon" src="/resources/icons/common/clear_input_icon.png" onClick={onClickFn}/>
        };
    }

    onInputChange(e) {
        const props = this.props,
            val = e.target.value,
            delayedOnInputChange = props.delayedOnInputChange;
        props.onInputChange && props.onInputChange(e, val);
        if(delayedOnInputChange) {
            window.clearTimeout(this.delayedOnInputChangeTimeoutId);
            this.delayedOnInputChangeTimeoutId = window.setTimeout(function() {
                delayedOnInputChange(e, val);
            }, props.delayedOnInputChangeTimeout || 500);
        }
    }

}

export default BigTextField;