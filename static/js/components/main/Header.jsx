import React from 'react';
import Icon from './../common/Icon.jsx';
import createReactClass from 'create-react-class';

export default createReactClass({
    render: function() {
        const me = this;
        const props = this.props;
        const operatorStatusState = props.operatorStatusState || {};

        return (
            <div className="app-header">
                <span className="logo">LOGO</span>
                <ul className="top-menu">
                    {getTabCfg('contact', ['contact', 'contactEdit'].indexOf(props.selectedItemId) > -1)}
                    {getTabCfg('phone', props.selectedItemId == 'phone')}
                    {getStatusItemCfg()}
                </ul>
            </div>
        );

        function getTabCfg(name, isSelected) {
            return <li onClick={() => props.onMainMenuItemClick(name)} className={isSelected ? 'selected' : ''}>
                <Icon iconPath={'header/' + name + '_black.png'} imgClassName="menu-item-image"/>
                <div className="selector"></div>
            </li>
        };

        function getStatusItemCfg() {
            return <li className="status-button" onClick={onStatusBtnClick}>
                <Icon iconPath={'header/status_black.png'} imgClassName="menu-item-image"/>
                <Icon iconPath={'header/statuses/' + operatorStatusState.currentStatus + '_icon.png'}
                      imgClassName="mini-status-icon"/>
                {operatorStatusState.showStatusPopup ? getStatusPopup() : ''}
            </li>
        };

        function onStatusBtnClick() {
            props.setOperatorStatusStateFn('showStatusPopup', !operatorStatusState.showStatusPopup);
        };

        function getStatusPopup() {
            const statuses = [
                {name: 'active', text: 'Доступен'},
                {name: 'dont_disturb', text: 'Не беспокоить'},
                {name: 'break', text: 'Перерыв'},
                {name: 'away', text: 'Нет на месте'},
                {name: 'no_at_work', text: 'Нет на работе'},
            ];

            var statusesList = <ul>
                {statuses.map((s) => {
                    var isSelected = operatorStatusState.currentStatus == s.name;
                    return <li className={isSelected ? 'selected' : ''} onClick={() => onStatusPupupItemClick(s.name)}>
                        <Icon iconPath={'header/statuses/' + s.name + '_icon.png'}/>
                        <span>{s.text}</span>
                        {isSelected ? <Icon imgClassName="selected-icon" iconPath={'header/statuses/selected_status_icon.png'}/> : ''}
                    </li>
                })}
            </ul>
            return <div className="statuses-popup">
                {statusesList}
            </div>
        };

        function onStatusPupupItemClick(status) {
            props.setOperatorStatusStateFn('currentStatus', status);
        };
    }
});