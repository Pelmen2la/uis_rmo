import React from 'react';

class Icon extends React.Component {
    render() {
        const props = this.props;
        return (
            <img className="icon" src={'/resources/icons/' + props.iconPath}/>
        );
    }
}

export default Icon;