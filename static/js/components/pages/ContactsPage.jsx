import React from 'react';
import TabControl from './../common/TabControl.jsx'
import BigTextField from './../common/BigTextField.jsx'
import ExpansionPanel from './../common/ExpansionPanel.jsx'
import CallsGrid from './contacts/CallsGrid.jsx';
import EmployeesGrid from './contacts/EmployeesGrid.jsx';
import Utils from "../../utils/appUtils";

class ContactsPage extends React.Component {
    componentDidMount() {
        this.loadTabData(this.props.stateObj.selectedTabName);
    }

    render() {
        const props = this.props;
        const stateObj = props.stateObj;
        if(!stateObj) {
            return '';
        }
        return <div className="main-page-container contacts-page">
            <TabControl
                tabsCfg={getTabsCfg()}
                selectedTabName={stateObj.selectedTabName}
                onTabClick={this.onTabClick.bind(this)}
            />
            <div className="search-input-wrapper">
                <BigTextField
                    hasClearIcon={true}
                    placeholder="Введите имя или номер..."
                    value={stateObj[this.getCurrentTabStateKey()].searchText}
                    onInputChange={this.onSearchInputChange.bind(this)}
                    delayedOnInputChange={this.onDelayedSearchInputChange.bind(this)}
                />
            </div>
            {this.getMainContent()}
        </div>;

        function getTabsCfg() {
            return [
                {name: 'recent', text: 'Недавние'},
                {name: 'contacts', text: 'Контакты'},
                {name: 'employees', text: 'Сотрудники'}
            ];
        };
    }

    getCurrentTabStateKey() {
        return this.props.stateObj.selectedTabName + 'TabState';
    }

    getMainContent() {
        const props = this.props,
            stateObj = props.stateObj,
            tabName = stateObj.selectedTabName,
            tabData = stateObj[this.getCurrentTabStateKey()].data;
        if(tabName === 'recent') {
            return <CallsGrid
                data={tabData}
                onNameCellClick={this.onCallsGridNameCellClick.bind(this)}
            />
        }
        else if(tabName === 'contacts') {
            return <EmployeesGrid
                data={tabData}
                onNameCellClick={this.onCallsGridNameCellClick.bind(this)}
            />
        } else if(tabName === 'employees') {
            return tabData.map(this.getEmployeesGroupExpansionPanel.bind(this));
        }
    }

    onTabClick(tabName) {
        const props = this.props;
        props.changeStateFn('selectedTabName', tabName);
        this.loadTabData(tabName);
    }

    onSearchInputChange(e, val) {
        this.props.changeStateFn(this.getCurrentTabStateKey() + '.searchText', val);
    }

    onDelayedSearchInputChange(e, val) {
        this.loadTabDataCore()
    }

    loadTabData() {
        window.clearTimeout(this.loadTabDataTimeoutId);
        this.loadTabDataTimeoutId = window.setTimeout(function() {
            this.loadTabDataCore();
        }.bind(this), 0);
    }

    loadTabDataCore() {
        const changeStateFn = this.props.changeStateFn;
        if(!changeStateFn) {
            return;
        }
        const tabName = this.props.stateObj.selectedTabName;
        const tabStateKey = this.getCurrentTabStateKey();
        const searchText = this.props.stateObj[tabStateKey].searchText;
        fetch('/fake_data/get_contacts_page_tab_data/' + tabName + '?searchText=' + searchText).then(function(response) {
            return response.json();
        }).then(function(gridData) {
            changeStateFn(tabStateKey + '.data', gridData);
        });
    }

    onCallsGridNameCellClick(record) {
        const props = this.props,
            personProps = Utils.getCallPersonProps(record);
        fetch('/fake_data/get_' + personProps.type + '/' + personProps.id).then((r) => r.json()).then((contactData) => {
            props.openContactEditPageFn(contactData);
        });
    }

    getEmployeesGroupExpansionPanel(group) {
        var expandedGroupIds = this.props.stateObj.employeesTabState.expandedGroupIds;
        const groupId = group.id,
            groupEmployeesGrid = <EmployeesGrid
                onNameCellClick={this.onEmployeeGridNameCellClick.bind(this)}
                data={group.employees}
            />,
            onGroupHeaderClick = function() {
                var groupIdIndex = expandedGroupIds.indexOf(groupId);
                if(groupIdIndex > -1) {
                    expandedGroupIds.splice(groupIdIndex, 1);
                } else {
                    expandedGroupIds.push(groupId);
                }
                this.props.changeStateFn('employeesTabState.expandedGroupIds', expandedGroupIds);
            }.bind(this);

        return <ExpansionPanel
            isExpanded={expandedGroupIds.indexOf(groupId) > -1}
            headerText={group.name}
            content={groupEmployeesGrid}
            onHeaderClick={onGroupHeaderClick}
            key={groupId}
        />
    }

    onEmployeeGridNameCellClick(rec) {
        const props = this.props;
        fetch('/fake_data/get_' + rec.type + '/' + rec.id).then((r) => r.json()).then((contactData) => {
            props.openContactEditPageFn(contactData);
        });
    }
};

export default ContactsPage;