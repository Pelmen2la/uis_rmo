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
            var ths = columnsCfg.map((c, i) => {
                return <th key={i}>{c.text}</th>
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

        function getCellRender(index, record, columnCfg) {
            var val = record[columnCfg.dataIndex],
                styleCfg = getCellWidthStyle(columnCfg),
                cellCfg = {className: '', style: styleCfg},
                innerHtml = val,
                onClickHandler = columnCfg.onCellClick ? (e) => {
                    columnCfg.onCellClick(record, val, columnCfg, e);
                } : () => null;
            if(columnCfg.renderer) {
                innerHtml = columnCfg.renderer(record, val, cellCfg);
            }
            return <td
                key={record.id + 'td' + index}
                style={styleCfg}
                className={cellCfg.className}
                onClick={onClickHandler}
                >
                {innerHtml}
                </td>;
        };

        function getCellWidthStyle(columnCfg) {
            var width = columnCfg.width,
                parsedWidth = parseInt(width);
            if(!width || isNaN(parsedWidth)) {
                return {};
            }
            if(width.toString().indexOf('%') > -1) {
                width = parsedWidth + '%';
            } else {
                width = parsedWidth + 'px';
            }
            return { width: width };
        }
    }
}

export default SimpleGrid;