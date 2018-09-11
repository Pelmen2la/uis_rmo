import React from 'react';
import Icon from './Icon.jsx';

class SimpleList extends React.Component {
    render() {
        const props = this.props,
            status = props.status,
            iconPath = 'common/statuses/' + (props.size || 16).toString() + '/' + status + '.png';

        return (
            <Icon imgClassName={'status-icon ' + props.status} iconPath={iconPath} onImageClick={props.onImageClick} />
        );
    }
}

export default SimpleList;