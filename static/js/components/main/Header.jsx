import React from 'react';
import Icon from './../common/Icon.jsx';
import StatusIcon from './../common/StatusIcon.jsx';
import Logo from './../common/Logo.jsx';
import StatusesDropdown from './../common/StatusesDropdown.jsx';
import createReactClass from 'create-react-class';

export default createReactClass({
    render: function() {
        const props = this.props;
        const operatorStatusState = props.operatorStatusState || {};

        return (
            <div className="app-header">
                <Logo/>
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
                <StatusIcon status={operatorStatusState.currentStatus} size="16"/>
                {operatorStatusState.showStatusPopup ? getStatusesDropdown() : ''}
            </li>
        };

        function onStatusBtnClick() {
            props.setOperatorStatusStateFn('showStatusPopup', !operatorStatusState.showStatusPopup);
        };

        function getStatusesDropdown() {
            return <StatusesDropdown
                selectedStatus={operatorStatusState.currentStatus}
                onItemClick={onStatusPopupItemClick}
            />
        };

        function onStatusPopupItemClick(status) {
            props.setOperatorStatusStateFn('currentStatus', status);
        };
    }
});