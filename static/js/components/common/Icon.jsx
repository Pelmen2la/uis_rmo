import React from 'react';

class Icon extends React.Component {
    render() {
        const props = this.props;
        return (
            <img
                className={'icon ' + (props.imgClassName || '')}
                src={'/resources/icons/' + props.iconPath}
                onClick={props.onImageClick ? props.onImageClick : () => null}
            />
        );
    }
}

export default Icon;