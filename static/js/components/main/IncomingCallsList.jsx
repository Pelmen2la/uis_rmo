import React from 'react';
import CallIcon from './../common/icons/CallIcon.jsx';
import Icon from './../common/icons/Icon.jsx';
import StatusesDropdown from './../common/StatusesDropdown.jsx';
import Logo from './../common/Logo.jsx';

class IncomingCallsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props,
            callsData = props.callsData || [];
        if(!callsData.length) {
            return '';
        }

        return <ul className="incoming-calls-list">
            {this.getCallItems(callsData)}
        </ul>
    }

    getCallItems(callsData) {
        return callsData.map((callData) => {
            const callIconData = {
                    direction: 'in',
                    is_internal: callData.is_internal,
                    status: 'successful'
                },
                splittedFullName = callData.employee_full_name.split(' ');

            return <li>
                <div className="common-info-block">
                    <CallIcon callData={callIconData}/>
                    <b>Входящий</b><br/>
                    <span className="gray-text">{callData.contact_phone_number}</span>
                </div>
                <div className="avatar">
                    {splittedFullName[0][0].toUpperCase()}
                    {splittedFullName[1][0].toUpperCase()}
                </div>
                <p className="contact-info-container">
                    <b>{callData.employee_full_name}</b>
                    <span className="gray-text">Генеральный директор</span>
                    <span className="gray-text">VIP клиенты, ПМ Алексеев Антон</span>
                </p>
                {this.getCallACBlock(callData)}
            </li>
        });
    }

    getCallACBlock(callData) {
        var items = [];
        if(callData.site_domain_name) {
            items.push(<span key="site_domain_name">
                <Icon iconPath="common/ac_items/site.png"/>
                {callData.site_domain_name}
            </span>);
        }
        if(callData.campaign_name) {
            items.push(<span key="campaign_name">
                <Icon iconPath="common/ac_items/ac.png"/>
                {callData.campaign_name}
            </span>);
        }
        if(callData.search_phrase) {
            items.push(<span key="search_phrase">
                <Icon iconPath="common/ac_items/search_phrase.png"/>
                {callData.search_phrase}
            </span>);
        }
        return <div className="ac-block">
            {items}
        </div>
    }
}

export default IncomingCallsList;