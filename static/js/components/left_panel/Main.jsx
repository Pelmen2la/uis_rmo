import React from 'react';
import TabControl from './TabControl.jsx';
import CallList from './CallList.jsx';
import FavoritesContactList from './FavoritesContactList.jsx';
import ExpansionPanel from './../common/ExpansionPanel.jsx';
import createReactClass from 'create-react-class';

export default createReactClass({
    render: function() {
        const props = this.props;
        const stateObj = props.stateObj || {};
        var getInnerComponents = function() {
                if(stateObj.activeTab === 'contacts') {
                    return getContactsTabContent();
                } else {
                    return getPhonesTabContent();
                }
            },
            getContactsTabContent = function() {
                return <React.Fragment>
                    <ExpansionPanel
                        isExpanded={stateObj.isRecentCallsListExpanded}
                        headerText="Недавние"
                        content={<CallList callList={stateObj.recentCallList}/>}
                        onHeaderClick={() => props.changeStateFn('isRecentCallsListExpanded', !stateObj.isRecentCallsListExpanded)}
                    />
                    <ExpansionPanel
                        isExpanded={stateObj.isFavoritesContactListExpanded}
                        headerText="Избранное"
                        content={<FavoritesContactList contactList={stateObj.favoritesContactList}/>}
                        onHeaderClick={() => props.changeStateFn('isFavoritesContactListExpanded', !stateObj.isFavoritesContactListExpanded)}
                    />
                </React.Fragment>
            },
            getPhonesTabContent = function() {
                return <ExpansionPanel
                    isExpanded={stateObj.isSalesDepartmentCallListExpanded}
                    headerText="Отдел продаж"
                    content={<CallList hasCallIcon={true} callList={stateObj.salesDepartmentCallList}/>}
                    onHeaderClick={() => props.changeStateFn('isSalesDepartmentCallListExpanded', !stateObj.isSalesDepartmentCallListExpanded)}
                />
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