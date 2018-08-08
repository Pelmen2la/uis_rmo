import React from 'react';
import Icon from './../common/Icon.jsx';
import createReactClass from 'create-react-class';

export default createReactClass({
    render: function() {
        const props = this.props;
        return (
            <ul className="common-tab-control">
                {getTabs(props.tabsCfg, props.onTabClick || (() => null))}
            </ul>
        );

        function getTabs(tabsCfg, onClickHandler) {
            var widthStyle = { width: 100 / tabsCfg.length + '%' };
            return tabsCfg.map((tabCfg) => {
                var name = tabCfg.name;
                return <li
                    style={widthStyle}
                    key={tabCfg.name}
                    onClick={(e) => onClickHandler(name, e)}
                    className={tabCfg.isSelected ? 'selected' : ''}>
                    {getTabInnerHtml(tabCfg)}
                    <div className="selector"></div>
                </li>
            });
        };
        function getTabInnerHtml(tabCfg) {
            if(tabCfg.iconUrl) {
                return <Icon iconPath={tabCfg.iconUrl}/>
            } else {
                return <span>{tabCfg.text}</span>
            }
        };
    }
});