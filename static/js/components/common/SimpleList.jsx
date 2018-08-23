import React from 'react';

class SimpleList extends React.Component {
    render() {
        const props = this.props;
        return (
            <ul className={'simple-list ' + (props.className || '')}>
                {getListItems(props.data || [])}
            </ul>
        );

        function getListItems(data) {
            return data.map((rec) => {
                return <li key={rec.id}>
                    <div className="left-items">
                        {props.getListItemLeftChildren(rec)}
                    </div>
                    <div className="right-items">
                        {props.getListItemRightChildren(rec)}
                    </div>
                </li>
            });
        };
    }
}

export default SimpleList;