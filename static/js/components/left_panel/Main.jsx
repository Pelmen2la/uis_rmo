import React from 'react';
import TabControl from './../common/TabControl.jsx';
import CallList from './CallList.jsx';
import FavoritesContactList from './FavoritesContactList.jsx';
import ExpansionPanel from './../common/ExpansionPanel.jsx';
import createReactClass from 'create-react-class';

export default createReactClass({
    render: function() {
        const props = this.props;
        const stateObj = props.stateObj || {};
        const tabsCfg = [
            { name: 'contacts', iconUrl: 'left_panel/contacts_tab_icon.png' },
            { name: 'calls', iconUrl: 'left_panel/calls_tab_icon.png' }
        ];
        var getInnerComponents = function() {
                if(stateObj.selectedTabName === 'contacts') {
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
                    tabsCfg={tabsCfg}
                    selectedTabName={stateObj.selectedTabName}
                    onTabClick={(tabName) => props.changeStateFn('selectedTabName', tabName)}
                />
                {getInnerComponents()}
            </div>
        );

    }
});