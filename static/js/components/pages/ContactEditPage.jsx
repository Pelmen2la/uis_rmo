import React from 'react';
import createReactClass from 'create-react-class';
import ContactForm from './contacts/ContactForm.jsx'
import Icon from './../common/Icon.jsx'
import SimpleGrid from './../common/SimpleGrid.jsx'
import ExpansionPanel from './../common/ExpansionPanel.jsx'

export default createReactClass({
    render: function() {
        const props = this.props;
        const stateObj = props.stateObj;
        return <div className="main-page-container contact-edit-page">
            <ContactForm
                isEdit={stateObj.isEdit}
                contactData={stateObj.contactData}
                changeStateFn={props.changeStateFn}
            />
            <ExpansionPanel
                isExpanded={stateObj.isCallHistoryListExpanded}
                headerText="История вызовов"
                content={getGridCfg()}
                onHeaderClick={() => props.changeStateFn('isCallHistoryListExpanded', !stateObj.isCallHistoryListExpanded)}
            />
        </div>;

        function getGridCfg() {
            return <div className="simple-grid-container">
                <SimpleGrid
                    hideHeader={true}
                    columnsCfg={getGridColumnsCfg()}
                    data={stateObj.contactData.callsHistory || []}
                />
            </div>
        };

        function getGridColumnsCfg() {
            return [
                {
                    dataIndex: 'direction',
                    width: 20,
                    renderer: (rec) => {
                        var imgName = rec.direction === 'in' ? 'incomig' : 'outgoing';
                        return <Icon iconPath={'common/' + imgName + '_call.png'}/>
                    }
                },
                {
                    dataIndex: 'direction',
                    width: 110,
                    renderer: (rec) => {
                        return <b>
                            {rec.direction === 'in' ? 'Входящий' : 'Исходящий'}
                        </b>
                    }
                },
                {
                    dataIndex: 'time',
                    renderer: (rec, val, cellCfg) => {
                        return <b>{val}</b>
                    }
                },
                {
                    dataIndex: 'status',
                    width: 90,
                    renderer: (rec, val, cellCfg) => {
                        cellCfg.className = 'gray-text';
                        return val;
                    }
                },
                {
                    dataIndex: 'date',
                    renderer: (rec, val, cellCfg) => {
                        cellCfg.className = 'date-cell gray-text';
                        return val.split('T')[0];
                    }
                }
            ]
        };
    }
});