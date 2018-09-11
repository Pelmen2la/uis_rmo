import React from 'react';
import createReactClass from 'create-react-class';
import Icon from './../common/icons/Icon.jsx';

export default createReactClass({
    render: function() {
        const props = this.props;

        return (
            <div className="phone-buttons-panel">
                {props.buttonsType === 'numbers' ? getNumberButtons() : getActionButtons()}
            </div>
        );

        function getNumberButtons() {
            return <React.Fragment>
                {getNumberButtonsBlock([1, 2, 3])}
                {getNumberButtonsBlock([4, 5, 6])}
                {getNumberButtonsBlock([7, 8, 9])}
                {getButtonsBlock([{ text: '*', value: 'star'}, getNumberButtonCfg(0), { text: '#', value: 'hash'}])}
            </React.Fragment>
        };

        function getActionButtons() {
            return <React.Fragment>
                {getActionButtonsBlock(['microphone', 'dialpad', 'transfer'])}
                {getActionButtonsBlock(['pause', 'plus', 'scenario'])}
                {getActionButtonsBlock(['record', 'fax', 'coach'])}
            </React.Fragment>
        };

        function getNumberButtonsBlock(numbers) {
            return getButtonsBlock(numbers.map(getNumberButtonCfg));
        };

        function getActionButtonsBlock(actions) {
            return getButtonsBlock(actions.map(getActionButtonCfg));
        };

        function getNumberButtonCfg(number) {
            return {
                text: number.toString(),
                value: number
            };
        };

        function getActionButtonCfg(actionName) {
            const label = {
                microphone: 'микрофон',
                dialpad: 'клавиатура',
                transfer: 'трансфер',
                pause: 'удержание',
                plus: 'добавить',
                scenario: 'сценарий',
                record: 'диктофон',
                fax: 'факс',
                coach: 'тренер'
            }[actionName];

            return {
                value: actionName,
                label: label,
                iconPath: 'phone_panel/' + actionName + '_button.png'
            };
        };

        function getButtonsBlock(buttonsCfg) {
            var buttons = buttonsCfg.map(getButton);
            return <ul className="buttons-block">
                {buttons}
            </ul>
        };

        function getButton(btnCfg, index) {
            return <li className="phone-button" key={index} onClick={() => props.onButtonClick(btnCfg.value)}>
                <div>
                    {btnCfg.text ? btnCfg.text : ''}
                    {btnCfg.iconPath ? <Icon iconPath={btnCfg.iconPath}/> : ''}
                </div>
                {btnCfg.label ? <span className="gray-text button-label">{btnCfg.label}</span> : ''}
            </li>
        };
    }
});