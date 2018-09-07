import React from 'react';
import SimpleGrid from './../../common/SimpleGrid.jsx'
import Icon from './../../common/Icon.jsx'

class ContactRecentGrid extends React.Component {
    render() {
        const props = this.props;
        return <SimpleGrid
            hideHeader={true}
            columnsCfg={this.getColumnsCfg()}
            data={props.data}
        />
    }

    getColumnsCfg() {
        return [
            {
                dataIndex: 'isFavourite',
                width: 20,
                renderer: (rec, val, cellCfg) => {
                    let iconName = 'star_' + (val ? 'black' : 'empty');
                    cellCfg.className = 'img-cell';
                    return <Icon imgClassName="star-icon" iconPath={'contacts_page/' + iconName + '.png'}/>
                }
            },
            {
                dataIndex: 'avatarUrl',
                width: 40,
                renderer: (rec, val, cellCfg) => {
                    cellCfg.className = 'img-cell';
                    return <Icon iconPath={'contacts_page/contact_ava.png'}/>
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
                onCellClick: this.props.onNameCellClick
            },
            {
                dataIndex: 'date',
                renderer: (rec, val, cellCfg) => {
                    cellCfg.className = 'date-cell';
                    return val.split('T')[0];
                }
            }
        ]
    }
}

export default ContactRecentGrid;