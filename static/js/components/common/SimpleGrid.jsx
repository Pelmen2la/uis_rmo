import React from 'react';

class SimpleGrid extends React.Component {
    render() {
        const props = this.props;
        if(!props.data.length) {
            return '';
        }
        return <table className="simple-grid">
            {props.hideHeader ? null : getHeaderRender(props.columnsCfg)}
            {getBodyRender(props.columnsCfg, props.data)}
        </table>;

        function getHeaderRender(columnsCfg) {
            var ths = columnsCfg.map((c) => {
                return <th key={c.dataIndex}>{c.text}</th>
            });
            return <thead><tr>{ths}</tr></thead>;
        };

        function getBodyRender(columnsCfg, data) {
            var rows = data.map((rec) => {
                return getRowRender(rec, columnsCfg)
            });
            return <tbody>{rows}</tbody>;
        };
        function getRowRender(record, columnsCfg) {
            var cells = columnsCfg.map(function(c, i) {
                return getCellRender(i, record, c);
            });
            return <tr key={record.id}>{cells}</tr>;
        };

        function getCellRender(id, record, columnCfg) {
            var val = record[columnCfg.dataIndex],
                cellCfg = {className: ''},
                innerHtml = val;
            if(columnCfg.renderer) {
                innerHtml = columnCfg.renderer(record, val, cellCfg);
            }
            return <td key={id} className={cellCfg.className}>{innerHtml}</td>;
        };
    }
}

export default SimpleGrid;