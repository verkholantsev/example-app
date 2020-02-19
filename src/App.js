import React, {useReducer, useCallback} from 'react';

import Field from './Field';

import './App.css';

const range = count => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(null);
  }
  return result;
};

const getRandomColor = () => {
  const random = Math.random();
  if (random < 0.25) {
    return 'red';
  } else if (random < 0.5) {
    return 'green';
  } else if (random < 0.75) {
    return 'blue';
  } else {
    return 'yellow';
  }
};

const copyMatrix = matrix => matrix.map(row => row.map(cell => ({...cell})));

const getColumn = (cells, colIndex) => {
  const rowsCount = cells.length;
  return range(rowsCount).map((_, row) => cells[row][colIndex]);
};

const mutateColumnColors = (cells, colIndex, colors) => {
  const rowsCount = cells.length;
  range(rowsCount).forEach((_, row) => {
    cells[row][colIndex].color = colors[row];
  });
  return cells;
};

const getAdjacentCells = (cells, {row, col}) => {
  const rowsCount = cells.length;
  const colsCount = cells[0].length;
  return [
    {row: row - 1, col},
    {row, col: col + 1},
    {row: row + 1, col},
    {row, col: col - 1},
  ]
    .filter(
      ({row, col}) =>
        0 <= row && row < rowsCount && 0 <= col && col < colsCount,
    )
    .map(({row, col}) => cells[row][col]);
};

const getAdjacentCellsOfSameColor = (cells, {row, col}, color) => {
  return getAdjacentCells(cells, {row, col}).filter(
    cell => cell.color === color,
  );
};

const doesAnyCellHaveSameColorNeighbour = cells => {
  const rowsCount = cells.length;
  const colsCount = cells[0].length;

  return range(rowsCount).some((_, row) =>
    range(colsCount).some((_, col) => {
      const cell = cells[row][col];

      if (cell.color === null) {
        return false;
      }

      return (
        getAdjacentCellsOfSameColor(cells, {row, col}, cell.color).length > 0
      );
    }),
  );
};

/**
 * This function implements a BFS, using queue here helps to avoid limitation of call stack size (in case of
 * recursive solution)
 */
const removeCellsOfSameColor = (cells, {col, row, color}) => {
  if (color === null) {
    return cells;
  }

  if (getAdjacentCellsOfSameColor(cells, {col, row}, color).length === 0) {
    return cells;
  }

  const cellsCopy = copyMatrix(cells);
  const queue = [cellsCopy[row][col]];
  cellsCopy[row][col].color = null;

  while (queue.length > 0) {
    const cell = queue.pop();
    const adjacentCellsOfSameColor = getAdjacentCellsOfSameColor(
      cellsCopy,
      cell,
      color,
    );

    adjacentCellsOfSameColor.forEach(({row, col}) => {
      cellsCopy[row][col].color = null;
    });

    queue.unshift(...adjacentCellsOfSameColor);
  }

  return cellsCopy;
};

/**
 * One of other possible ways to solve this is to store a transposed matrix and move it to the left (inside of moving
 * it down). This will make `getColumn` and  `mutateColumnColors` functions redundant. It should be a more optimal
 * solution, but it comes with a trade-off of unusual/inconvinient matrix dimensions, so I decided to stick to
 * this approach.
 */
const moveColumnsDown = cells => {
  const colsCount = cells[0].length;
  let cellsCopy = copyMatrix(cells);

  range(colsCount).forEach((_, index) => {
    const column = getColumn(cellsCopy, index);

    const colors = column
      .map(cell => cell.color)
      .filter(color => color !== null);

    cellsCopy = mutateColumnColors(cellsCopy, index, [
      ...range(column.length - colors.length),
      ...colors,
    ]);
  });

  return cellsCopy;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CELL_CLICK': {
      const cells = removeCellsOfSameColor(state.cells, action.data);
      const movedCells = moveColumnsDown(cells);
      return {
        cells: movedCells,
        isGameOver: !doesAnyCellHaveSameColorNeighbour(movedCells),
      };
    }

    default:
      return state;
  }
};

const initState = ({width, height}) => {
  const cells = range(height).map((_, row) => {
    return range(width).map((_, col) => ({
      row,
      col,
      color: getRandomColor(),
    }));
  });
  return {cells};
};

function App() {
  const [state, dispatch] = useReducer(
    reducer,
    {width: 10, height: 10},
    initState,
  );

  const onCellClick = useCallback(
    data => dispatch({type: 'CELL_CLICK', data}),
    [],
  );

  const gameOverLabel =
    state.isGameOver ? (
      <div className="App__game-over-label">
        <h2>Game over!</h2>
        <p>Press ⌘-R or Ctrl-R to restart</p>
      </div>
    ) : null;

  return (
    <div>
      <div className="App__field">
        <Field cells={state.cells} onCellClick={onCellClick} />
      </div>
      {gameOverLabel}
    </div>
  );
}

export default App;
