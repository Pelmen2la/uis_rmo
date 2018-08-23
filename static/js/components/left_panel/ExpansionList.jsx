import React from 'react';
import SimpleList from './../common/SimpleList.jsx';
import ExpansionPanel from './../common/ExpansionPanel.jsx';

class ExpansionList extends React.Component {
    render() {
        const props = this.props;

        return (
            <ExpansionPanel
                isExpanded={props.isExpanded}
                isReverse={props.isReverse}
                headerText={props.headerText}
                onHeaderClick={props.onExpansionPanelHeaderClick}
                content={
                    <SimpleList
                        className={props.listClassName}
                        data={props.listData}
                        getListItemLeftChildren={props.getListItemLeftChildrenFn}
                        getListItemRightChildren={props.getListItemRightChildrenFn}
                    />
                }
            />
        );
    }
}

export default ExpansionList;