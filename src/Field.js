import React from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';

import './Field.css';

export default function Field(props) {
  const cells = props.cells.flatMap(row =>
    row.map(({row, col, color}) => (
      <Cell
        key={row + '-' + col}
        row={row}
        col={col}
        color={color}
        onClick={props.onCellClick}
      />
    )),
  );
  return <div className="Field">{cells}</div>;
}

Field.propTypes = {
  cells: PropTypes.array,
  onCellClick: PropTypes.func,
};
