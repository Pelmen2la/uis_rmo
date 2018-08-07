import React from 'react';
import Icon from './../common/Icon.jsx';

class ExpansionPanel extends React.Component {
    render() {
        const props = this.props;
        const isExpanded = props.isExpanded;
        const content = isExpanded && props.content ? props.content : '';

        return (
            <div>
                <div className="expansion-panel-header" onClick={props.onHeaderClick}>
                    <Icon iconPath={'common/expansion_panel/' + (isExpanded ? 'collapse' : 'expand') + '_icon.png'}/>
                    {props.headerText}
                </div>
                {content}
            </div>
        );
    }
}

export default ExpansionPanel;