import React from 'react';
import Icon from './../common/Icon.jsx';
import createReactClass from 'create-react-class';

export default createReactClass({
    render: function() {
        const props = this.props;
        return (
            <ul className="left-tab-control">
                {getTabCfg('contacts', props.activeTab == 'contacts')}
                {getTabCfg('calls', props.activeTab == 'calls')}
            </ul>
        );

        function getTabCfg(name, isSelected) {
            return <li onClick={() => props.onTabClick(name)} className={isSelected ? 'selected' : ''}>
                <Icon iconPath={'left_panel/' + name + '_tab_icon.png'}/>
                <div className="selector"></div>
            </li>
        }
    }
});