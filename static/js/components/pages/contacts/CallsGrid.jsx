import React from 'react';
import SimpleGrid from './../../common/SimpleGrid.jsx'
import Icon from './../../common/icons/Icon.jsx'
import CallIcon from './../../common/icons/CallIcon.jsx'

class CallsGrid extends React.Component {
    render() {
        const props = this.props;
        return <SimpleGrid
            className="calls-grid"
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
                    cellCfg.className = 'img-cell';
                    return <CallIcon callData={rec}/>
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
                dataIndex: 'comment',
                width: 24,
                renderer: (rec, val, cellCfg) => {
                    var commentIconClassName = 'comment-icon ' + (val ? '' : 'empty');
                    return <div className={commentIconClassName}>
                        {val ? this.getCommentDropdown(val) : ''}
                    </div>
                }
            },
            {
                dataIndex: 'tags',
                width: 60,
                renderer: (rec, val, cellCfg) => {
                    const tagsCount = val ? val.length : 0;
                    var tagsElementClassName = 'tags-element ' + (tagsCount ? '' : 'empty');
                    return <div className={tagsElementClassName}>
                        {tagsCount}
                        {tagsCount ? this.getTagsDropdown(val) : ''}
                    </div>
                }
            },
            {
                dataIndex: 'date',
                renderer: (rec, val, cellCfg) => {
                    cellCfg.className = 'date-cell';
                    return <React.Fragment>
                        <span className="time">{rec.time}</span>
                        <span className="date">{val.split('T')[0]}</span>
                        <span className="square-call-btn"></span>
                    </React.Fragment>
                }
            }
        ]
    }

    getTagsDropdown(tags) {
        const tagItems = tags.map((t, i) => <li key={i}>{t}</li>);
        return <ul className="dropdown">
            {tagItems}
        </ul>
    }

    getCommentDropdown(text) {
        return <span className="dropdown">{text}</span>
    }
}

export default CallsGrid;