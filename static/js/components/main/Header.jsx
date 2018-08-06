import React from 'react';
import Icon from './../common/Icon.jsx';
import {withStyles} from '@material-ui/core/styles';
import createReactClass from 'create-react-class';

const styles = theme => ({
    root: {
        overflow: 'auto'
    },
});

export default withStyles(styles)(createReactClass({
    render: function() {
        const props = this.props;

        return (
            <div className="app-header">
                <span className="logo">LOGO</span>
                <ul className="top-menu">
                    {getTabCfg('contact', props.selectedItemId == 'contact')}
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
}));