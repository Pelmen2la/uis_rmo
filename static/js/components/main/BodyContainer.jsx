import React from 'react';
import createReactClass from 'create-react-class';
import LeftPanel from './../left_panel/Main.jsx'

export default createReactClass({
    render: function() {
        const props = this.props;
        const recentCallsList = props.recentCallsList || [];
        return <div className="main-container">
            <LeftPanel
                activeTab={props.leftPanelActiveTab}
                onTabClick={props.onTabControlClick}
                recentCallList={recentCallsList}></LeftPanel>
        </div>
    }
});