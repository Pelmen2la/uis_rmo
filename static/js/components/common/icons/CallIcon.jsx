import React from 'react';
import Icon from './Icon.jsx';

class CallIcon extends React.Component {
    render() {
        const props = this.props,
            callData = props.callData,
            pathParts = [callData.is_internal ? 'internal' : 'external'];
        if(callData.status !== 'no_connection') {
            pathParts.push(callData.direction === 'in' ? 'incoming' : 'outgoing');
        }
        pathParts.push(callData.status);
        const iconPath = 'common/calls/' + pathParts.join('_') + '.png';

        return (
            <Icon imgClassName={'foinished-call-icon'} iconPath={iconPath} onImageClick={props.onImageClick} />
        );
    }
}

export default CallIcon;