import React from 'react';
import ExpansionList from './ExpansionList.jsx';
import Icon from './../common/icons/Icon.jsx';
import CallIcon from './../common/icons/CallIcon.jsx';
import ExpansionPanel from './../common/ExpansionPanel.jsx';
import createReactClass from 'create-react-class';
import Utils from './../../utils/appUtils.js';

export default createReactClass({
    render: function() {
        const props = this.props;
        const stateObj = props.stateObj || {};

        return (
            <div className="left-panel">
                <ExpansionPanel
                    headerText="Очередь вызовов"
                    isExpanded={stateObj.expandedListName == 'callsQueue'}
                    onHeaderClick={() => onExpansionListHeaderClick('callsQueue')}
                    content={getQueueCallGroupsHtml(stateObj.callQueueGroups || [])}
                />
                <ExpansionList
                    headerText="Недавние"
                    isExpanded={stateObj.expandedListName == 'recentCalls'}
                    onExpansionPanelHeaderClick={() => onExpansionListHeaderClick('recentCalls')}
                    listData={stateObj.recentCallListData}
                    listClassName="recent-calls-list"
                    getListItemLeftChildrenFn={getCallsListLeftItems}
                    getListItemRightChildrenFn={getCallsListRightItems}
                />
                <ExpansionList
                    headerText="Избранное"
                    isExpanded={stateObj.expandedListName == 'favoriteContacts'}
                    onExpansionPanelHeaderClick={() => onExpansionListHeaderClick('favoriteContacts')}
                    listData={stateObj.favoriteContactListData}
                    listClassName="favorite-contact-list"
                    getListItemLeftChildrenFn={getFavouriteContactsListLeftItems}
                    getListItemRightChildrenFn={getFavouriteContactsListRightItems}
                />
            </div>
        );

        function onExpansionListHeaderClick(panelName) {
            if(stateObj.expandedListName === panelName) {
                props.changeStateFn('expandedListName', null);
            } else {
                props.changeStateFn('expandedListName', panelName);
            }
        };
        function getQueueCallGroupsHtml(groups) {
            return groups.map(getQueueCallGroupHtml);
        };
        function getQueueCallGroupHtml(group) {
            function onExpansionListHeaderClick(groupId) {
                var ids = stateObj.expandedCallQueueGroupIds;
                if(isExpanded) {
                    ids.splice(groupIndexInExpandedList, 1);
                } else {
                    ids.push(groupId);
                }
                props.changeStateFn('expandedCallQueueGroupIds', ids);
            };

            var groupIndexInExpandedList = stateObj.expandedCallQueueGroupIds.indexOf(group.id),
                isExpanded = groupIndexInExpandedList > -1;

            return <ExpansionList
                key={group.id}
                headerText={group.name}
                isExpanded={isExpanded}
                isReverse={true}
                onExpansionPanelHeaderClick={() => onExpansionListHeaderClick(group.id)}
                listData={group.calls}
                listClassName="queue-calls-list"
                getListItemLeftChildrenFn={getCallsListLeftItems}
                getListItemRightChildrenFn={getCallsListRightItems}
            />
        };
        function getFavouriteContactsListLeftItems(contact) {
            var isInCall = contact.status !== 'unknown' ? contact.isInCall : 'unknown';
            return <React.Fragment>
                    <Icon iconPath={'common/' + contact.status + '_status.png'}/>
                    <Icon iconPath={'common/' + isInCall + '_icon.png'}/>
                    <span className="text-container">
                        <span>{contact.surname + ' ' + contact.name}</span><br/>
                        <span className="phone-text gray-text">{contact.phone}</span>
                    </span>
                </React.Fragment>
        };
        function getFavouriteContactsListRightItems() {
            return getCallIconHtml();
        };

        function getCallsListLeftItems(call) {
            const nameAndPhoneNumb = Utils.getCallOwnerNameAndPhoneNumb(call);
            return <React.Fragment>
                <CallIcon callData={call}/>
                <span className="text-container">
                    <span>{nameAndPhoneNumb.name}</span><br/>
                    <span className="phone-text gray-text">{nameAndPhoneNumb.number}</span>
                </span>
            </React.Fragment>
        };
        function getCallsListRightItems(call) {
            return <React.Fragment>
                {getCallIconHtml()}
                <span className="date-span">{call.date.split('T')[1].substring(0, 5)}</span>
            </React.Fragment>
        };
        function getCallIconHtml() {
            return <span className="square-call-btn"></span>
        };
    }
});