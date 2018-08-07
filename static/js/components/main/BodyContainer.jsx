import React from 'react';
import createReactClass from 'create-react-class';
import LeftPanel from './../left_panel/Main.jsx'

export default createReactClass({
    render: function() {
        const props = this.props;
        return <div className="main-container">
            <LeftPanel
                activeTab={props.leftPanelActiveTab}
                onTabClick={props.onLeftPanelTabControlClick}
                recentCallList={props.recentCallsList || []}
                recentCallListExanded={props.isLeftPanelRecentCallsListExpanded}
                onRecentCallListHeaderClick={props.onLeftPanelRecentCallListHeaderClick}>
            </LeftPanel>
        </div>
    }
});