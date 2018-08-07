import React from 'react';
import TabControl from './TabControl.jsx';
import RecentCallList from './RecentCallList.jsx';
import ExpansionPanel from './../common/ExpansionPanel.jsx';
import createReactClass from 'create-react-class';

export default createReactClass({
    render: function() {
        const props = this.props;
        var getInnerComponents = function() {
            if(props.activeTab === 'contacts') {
                return <ExpansionPanel
                    isExpanded={props.recentCallListExanded}
                    headerText="Недавние"
                    content={<RecentCallList callList={props.recentCallList}/>}
                    onHeaderClick={() => props.onRecentCallListHeaderClick(!props.recentCallListExanded)}
                />
            } else {
                return '';
            }
        };

        return (
            <div className="left-panel">
                <TabControl
                    activeTab={props.activeTab}
                    onTabClick={props.onTabClick}
                />
                {getInnerComponents()}
            </div>
        );

    }
});