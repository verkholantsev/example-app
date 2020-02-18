import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import './Cell.css';

const CELL_SIZE = 50;

export default function Cell({row, col, color, onClick}) {

  const style = {
    top: row * CELL_SIZE,
    left: col * CELL_SIZE,
    backgroundColor: color,
  };

  const onClickCallback = useCallback(() => onClick({row, col, color}), [
    onClick,
    row,
    col,
    color,
  ]);

  return <div className="Cell" style={style} onClick={onClickCallback} />;
}

Cell.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.func,
};
