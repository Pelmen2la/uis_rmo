import React from 'react';
import Icon from './../common/Icon.jsx';
import createReactClass from 'create-react-class';

export default createReactClass({
    render: function() {
        const props = this.props;

        return (
            <div className="app-header">
                <span className="logo">LOGO</span>
                <ul className="top-menu">
                    {getTabCfg('contact', ['contact', 'contactEdit'].indexOf(props.selectedItemId) > -1)}
                    {getTabCfg('phone', props.selectedItemId == 'phone')}
                </ul>
            </div>
        );

        function getTabCfg(name, isSelected) {
            return <li onClick={() => props.onMainMenuItemClick(name)} className={isSelected ? 'selected' : ''}>
                <Icon iconPath={'header/' + name + '_black.png'}/>
                <div className="selector"></div>
            </li>
        }
    }
});