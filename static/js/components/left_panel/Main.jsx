import React from 'react';
import TabControl from './TabControl.jsx';
import RecentCallList from './RecentCallList.jsx';
import createReactClass from 'create-react-class';

export default createReactClass({
    render: function() {
        const props = this.props;
        var getInnerComponents = function() {
            if(props.activeTab === 'contacts') {
                return <RecentCallList callList={props.recentCallList}/>
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