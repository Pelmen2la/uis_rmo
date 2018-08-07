import React from 'react';
import TabControl from './TabControl.jsx';
import RecentCallList from './RecentCallList.jsx';
import FavoritesContactList from './FavoritesContactList.jsx';
import ExpansionPanel from './../common/ExpansionPanel.jsx';
import createReactClass from 'create-react-class';

export default createReactClass({
    render: function() {
        const props = this.props;
        const stateObj = props.stateObj || {};
        var getInnerComponents = function() {
                if(stateObj.activeTab === 'contacts') {
                    return getContactsTab();
                } else {
                    return '';
                }
            },
            getContactsTab = function() {
                return <div>
                    <ExpansionPanel
                        isExpanded={stateObj.isRecentCallsListExpanded}
                        headerText="Недавние"
                        content={<RecentCallList callList={stateObj.recentCallList}/>}
                        onHeaderClick={() => props.changeStateFn('isRecentCallsListExpanded', !stateObj.isRecentCallsListExpanded)}
                    />
                    <ExpansionPanel
                        isExpanded={stateObj.isFavoritesContactListExpanded}
                        headerText="Избранное"
                        content={<FavoritesContactList contactList={stateObj.favoritesContactList}/>}
                        onHeaderClick={() => props.changeStateFn('isFavoritesContactListExpanded', !stateObj.isFavoritesContactListExpanded)}
                    />
                </div>
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