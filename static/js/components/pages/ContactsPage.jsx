import React from 'react';
import createReactClass from 'create-react-class';
import SimpleGrid from './../common/SimpleGrid.jsx'
import TabControl from './../common/TabControl.jsx'
import BigTextField from './../common/BigTextField.jsx'

export default createReactClass({
    render: function() {
        const props = this.props;
        const stateObj = props.stateObj || {};
        return <div className="main-page-container contacts-page">
            <TabControl
                tabsCfg={getTabsCfg()}
                selectedTabName={stateObj.selectedTabName}
                onTabClick={(tabName) => props.changeStateFn('selectedTabName', tabName)}
            />
            <div className="search-input-wrapper">
                <BigTextField
                    hasClearIcon={true}
                    placeholder="Введите имя или номер..."
                />
            </div>
            <SimpleGrid
                hideHeader={true}
                columnsCfg={getGridColumnsCfg()}
                data={stateObj.gridData || []}
            />
        </div>;

        function getTabsCfg() {
            return [
                {name: 'recent', text: 'Недавние'},
                {name: 'contacts', text: 'Контакты'},
                {name: 'employees', text: 'Сотрудники'}
            ];
        };
        function getGridColumnsCfg() {
            return [
                {
                    dataIndex: 'isFavourite',
                    width: 20,
                    renderer: (rec, val, cellCfg) => {
                        let iconName = 'star_' + (val ? 'black' : 'empty');
                        cellCfg.className = 'img-cell';
                        return <img className="star-icon" src={'/resources/icons/contacts_page/' + iconName + '.png'}/>
                    }
                },
                {
                    dataIndex: 'avatarUrl',
                    width: 40,
                    renderer: (rec, val, cellCfg) => {
                        cellCfg.className = 'img-cell';
                        return <img src={'/resources/icons/contacts_page/contact_ava.png'}/>
                    }
                },
                {
                    dataIndex: 'name',
                    renderer: (rec, val, cellCfg) => {
                        cellCfg.className = 'name-cell';
                        return <div>
                            <b>{[rec.name, rec.phone].join(', ')}</b><br/>
                            <span className="companyInfo">{[rec.companyName, rec.position].join(', ')}</span>
                        </div>
                    },
                    onCellClick: function(record) {
                        fetch('/fake_data/get_contact/' + record.id).then((r) => r.json()).then((contactData) => {
                            props.openContactEditPageFn(contactData);
                        })
                    }
                },
                {
                    dataIndex: 'date',
                    renderer: (rec, val, cellCfg) => {
                        cellCfg.className = 'date-cell';
                        return val.split('T')[0];
                    }
                }
            ]
        };
    }
});