import React from 'react';
import Icon from './../common/Icon.jsx';
import StatusIcon from './../common/StatusIcon.jsx';
import StatusesDropdown from './../common/StatusesDropdown.jsx';
import Logo from './../common/Logo.jsx';

class AwayWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            awayStartTime: new Date(),
            now: new Date(),
            timerIntervalId: null,
            selectedStatus: props.currentStatus,
            isStatusesDropdownVisible: false
        };
    }

    componentDidMount() {
        var timeoutId = window.setInterval(function() {
            this.setState({ 'now': new Date() });
        }.bind(this), 1000);
        this.setState({ 'timerIntervalId': timeoutId });
    }

    componentWillUnmount() {
        window.clearTimeout(this.state.timerIntervalId);
    }

    render() {
        const props = this.props,
            selectedStatus = this.state.selectedStatus;
        return (
            <div className="away-window">
                <Logo/>
                <div className="center-block">
                    <div className="items-wrapper">
                        <Icon iconPath="contacts_page/contact_ava_big.png" />
                        <span>
                            <span className="gray-text">Ваш статус:</span>
                            {props.currentStatus}
                        </span>
                        {this.getAwayTime()}
                        <div className="change-status-container">
                            <div className="statuses-combo" onClick={this.onStatusComboClick.bind(this)}>
                                <StatusIcon status={selectedStatus} size="24"/>
                                <span>{selectedStatus}</span>
                                <Icon iconPath="common/expansion_panel/collapse_icon.png" imgClassName="dropdown-arrow" />
                                {this.getStatusesDropdown()}
                            </div>
                            <span className="continue-arrow" onClick={this.onContinueBtnClick.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getAwayTime() {
        var awayTime = this.state.awayStartTime,
            text = this.formatSeconds(Math.trunc((this.state.now.getTime() - awayTime.getTime()) / 1000));
        return <span>{text}</span>
    }

    formatSeconds(seconds) {
        function formatNumber(val) {
            var res = val.toString();
            if(res.length < 2) {
                res = '0' + res;
            }
            return res;
        }

        var hours = Math.trunc(seconds / 60 / 24);
        seconds -= hours * 60 * 24;
        var minutes = Math.trunc(seconds / 60);
        seconds -= minutes * 60;
        return [formatNumber(hours), formatNumber(minutes), formatNumber(seconds)].join(':');
    }

    getStatusesDropdown() {
        if(!this.state.isStatusesDropdownVisible) {
            return '';
        }
        return <StatusesDropdown
            selectedStatus={this.state.selectedStatus}
            onItemClick={this.onStatusesDropdownItemClick.bind(this)}
        />
    }

    onStatusComboClick() {
        this.setState({ isStatusesDropdownVisible: !this.state.isStatusesDropdownVisible });
    }

    onStatusesDropdownItemClick(status, e) {
        e.stopPropagation();
        this.setState({
            selectedStatus: status,
            isStatusesDropdownVisible: false
        });
    }

    onContinueBtnClick() {
        this.props.setOperatorStatusFn(this.state.selectedStatus);
    }
}

export default AwayWindow;