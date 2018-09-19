import React from 'react';
import SmallContactList from './../common/SmallContactList.jsx';
import ExpansionPanel from "./../common/ExpansionPanel.jsx";

class TransferPanel extends React.Component {
    render() {
        const props = this.props;
        if(!props || !props.employeeGroups || !props.employeeGroups.length) {
            return '';
        }

        return <div className="transfer-employee-groups-list">
            {props.employeeGroups.map(this.getGroupExpansionPanel.bind(this))}
        </div>
    }

    getGroupExpansionPanel(group) {
        const props = this.props,
            groupId = group.id,
            groupContactList = <SmallContactList
                contactList={group.employees}
                rightButtonHtml={this.getTransferButton()}
            />;

        return <ExpansionPanel
            isExpanded={props.expandedGroupsIds.indexOf(groupId) > -1}
            headerText={group.name}
            content={groupContactList}
            onHeaderClick={() => props.onGroupHeaderClick(groupId)}
            key={groupId}
        />
    }

    getTransferButton() {
        return <span className="small-list-full-height-btn do-transfer-button"></span>
    }
};

export default TransferPanel;