import React from 'react';
import TabControl from './TabControl.jsx';
import RecentCallList from './RecentCallList.jsx';
import ExpansionPanel from './../common/ExpansionPanel.jsx';
import createReactClass from 'create-react-class';

export default createReactClass({
    render: function() {
        const props = this.props;
        const stateObj = props.stateObj || {};
        var getInnerComponents = function() {
            if(stateObj.activeTab === 'contacts') {
                return <ExpansionPanel
                    isExpanded={stateObj.isRecentCallsListExpanded}
                    headerText="Недавние"
                    content={<RecentCallList callList={stateObj.recentCallList}/>}
                    onHeaderClick={() => props.changeStateFn('isRecentCallsListExpanded', !stateObj.isRecentCallsListExpanded)}
                />
            } else {
                return '';
            }
        };

        return (
            <div className="left-panel">
                <TabControl
                    activeTab={stateObj.activeTab}
                    onTabClick={(tabName) => props.changeStateFn('activeTab', tabName)}
                />
                {getInnerComponents()}
            </div>
        );

    }
});