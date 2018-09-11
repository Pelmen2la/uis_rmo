import React from 'react';
import Icon from './../common/icons/Icon.jsx';

class ExpansionPanel extends React.Component {
    render() {
        const props = this.props;
        const isExpanded = props.isExpanded;
        const isReverse = props.isReverse;
        const content = isExpanded && props.content ? props.content : '';

        return (
            <div className="expansion-panel-container">
                <div className={'expansion-panel-header ' + (isReverse ? 'reverse' : '')} onClick={props.onHeaderClick}>
                    {getHeaderItems()}
                </div>
                {content}
            </div>
        );

        function getHeaderItems() {
            var items = [
                <Icon key="expand-icon" iconPath={'common/expansion_panel/' + (isExpanded ? 'collapse' : 'expand') + '_icon.png'}/>,
                props.headerText
            ];
            if(isReverse) {
                items = items.reverse();
            }
            return items;
        }
    }
}

export default ExpansionPanel;