import React from 'react';
import TabControl from './../common/TabControl.jsx'
import BigTextField from './../common/BigTextField.jsx'
import CallsGrid from './contacts/CallsGrid.jsx';
import EmployeesGrid from './contacts/EmployeesGrid.jsx';
import Utils from "../../utils/appUtils";

class ContactsPage extends React.Component {
    componentDidMount() {
        this.loadGridData(this.props.stateObj.selectedTabName);
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
                    value={stateObj[this.getCurrentGridStateKey()].searchText}
                    onInputChange={this.onSearchInputChange.bind(this)}
                    delayedOnInputChange={this.onDelayedSearchInputChange.bind(this)}
                />
            </div>
            {this.getMainGrid()}
        </div>;

        function getTabsCfg() {
            return [
                {name: 'recent', text: 'Недавние'},
                {name: 'contacts', text: 'Контакты'},
                {name: 'employees', text: 'Сотрудники'}
            ];
        };
    }

    getCurrentGridStateKey() {
        return this.props.stateObj.selectedTabName + 'GridState';
    }

    getMainGrid() {
        const props = this.props,
            stateObj = props.stateObj,
            gridName = stateObj.selectedTabName,
            gridData = stateObj[this.getCurrentGridStateKey()].data;
        if(gridName === 'recent') {
            return <CallsGrid
                data={gridData}
                onNameCellClick={this.onCallsGridNameCellClick.bind(this)}
            />
        }
        return <EmployeesGrid
            data={gridData}
            onNameCellClick={this.onCallsGridNameCellClick.bind(this)}
        />
    }

    onTabClick(tabName) {
        const props = this.props;
        props.changeStateFn('selectedTabName', tabName);
        this.loadGridData(tabName);
    }

    onSearchInputChange(e, val) {
        this.props.changeStateFn(this.getCurrentGridStateKey() + '.searchText', val);
    }

    onDelayedSearchInputChange(e, val) {
        this.loadGridDataCore()
    }

    loadGridData(gridType) {
        window.clearTimeout(this.loadGridDataTimeoutId);
        this.loadGridDataTimeoutId = window.setTimeout(function() {
            this.loadGridDataCore();
        }.bind(this), 0);
    }

    loadGridDataCore() {
        const changeStateFn = this.props.changeStateFn;
        if(!changeStateFn) {
            return;
        }
        const gridType = this.props.stateObj.selectedTabName
        const gridStateKey = this.getCurrentGridStateKey();
        const searchText = this.props.stateObj[gridStateKey].searchText;
        fetch('/fake_data/get_grid_data/' + gridType + '?searchText=' + searchText).then(function(response) {
            return response.json();
        }).then(function(gridData) {
            changeStateFn(gridStateKey + '.data', gridData);
        });
    }

    onCallsGridNameCellClick(record) {
        const props = this.props,
            personProps = Utils.getCallPersonProps(record);
        fetch('/fake_data/get_' + personProps.type + '/' + personProps.id).then((r) => r.json()).then((contactData) => {
            props.openContactEditPageFn(contactData);
        });
    }
};

export default ContactsPage;