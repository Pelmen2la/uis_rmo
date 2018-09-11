import React from 'react';
import Icon from './icons/Icon.jsx';
import StatusIcon from './icons/StatusIcon.jsx';

class StatusesDropdown extends React.Component {
    render() {
        return <div className="statuses-dropdown">
            {this.getStatusesList()}
        </div>
    }

    getStatusesList() {
        const props = this.props,
            statuses = this.getStatuses(),
            selectedStatus = props.selectedStatus;

        return <ul>
            {statuses.map((s) => {
                var statusName = s.name,
                    isSelected = selectedStatus == statusName;
                return <li className={isSelected ? 'selected' : ''} onClick={(e) => props.onItemClick(s.name, e)} key={statusName}>
                    <StatusIcon status={s.name} size="24"/>
                    <span>{s.text}</span>
                    {isSelected ?
                        <Icon imgClassName="selected-icon" iconPath={'common/statuses/selected_status_icon.png'}/> : ''}
                </li>
            })}
        </ul>
    }

    getStatuses() {
        return [
            {name: 'available', text: 'Доступен'},
            {name: 'do_not_disturb', text: 'Не беспокоить'},
            {name: 'dinner', text: 'Перерыв'},
            {name: 'not_here', text: 'Нет на месте'},
            {name: 'not_at_work', text: 'Нет на работе'},
        ]
    }
}

export default StatusesDropdown;