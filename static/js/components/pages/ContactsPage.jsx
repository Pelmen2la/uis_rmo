import React from 'react';
import createReactClass from 'create-react-class';
import SimpleGrid from './../common/SimpleGrid.jsx'

export default createReactClass({
    render: function() {
        const props = this.props;
        const stateObj = props.stateObj || {};
        return <div className="main-page-container contacts-page">
            <SimpleGrid
                hideHeader={true}
                columnsCfg={getGridColumnsCfg()}
                data={stateObj.gridData || []}
            />
        </div>;

        function getGridColumnsCfg() {
            return [
                {
                    dataIndex: 'isFavourite',
                    renderer: (rec, val, cellCfg) => {
                        let iconName = 'star_' + (val ? 'black' : 'empty');
                        cellCfg.className = 'img-cell';
                        return <img className="star-icon" src={'/resources/icons/contacts_page/' + iconName + '.png'}/>
                    }
                },
                {
                    dataIndex: 'avatarUrl',
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