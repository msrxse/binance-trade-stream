import { FixedSizeGrid } from 'react-window'

import { GridArray } from '@/types/types'

import styles from './Grid.module.css'

type CellProps = {
  columnIndex: number
  rowIndex: number
  style: any
  data: GridArray
}

const Cell = ({ columnIndex, rowIndex, style, data }: CellProps) => {
  const row = data[rowIndex][columnIndex]

  return (
    <div
      data-testid={`rowCell-${rowIndex}-${columnIndex}`}
      className={`
        ${styles.allCells}
        ${rowIndex % 2 ? styles.gridItemOdd : styles.gridItemEven}
        ${columnIndex === data[rowIndex].length - 1 ? styles.lastColumn : ''}
      `}
      style={style}
    >
      {row}
    </div>
  )
}

const Header = ({ columnIndex, rowIndex, style, data }: CellProps) => {
  const header = data[rowIndex][columnIndex]

  return (
    <div
      data-testid={`headerCell-${rowIndex}-${columnIndex}`}
      className={`
        ${styles.allCells}
        ${rowIndex === 0 ? styles.headers : ''}
      `}
      style={style}
    >
      {header}
    </div>
  )
}

const Grid = ({ gridRef, items }: { gridRef: any; items: GridArray }) => {
  if (items.length === 0) {
    return null
  }

  return (
    <>
      <FixedSizeGrid
        columnCount={items[0].length}
        columnWidth={150}
        height={35}
        rowCount={1}
        rowHeight={35}
        width={600}
        itemData={items}
      >
        {Header}
      </FixedSizeGrid>
      <FixedSizeGrid
        ref={gridRef}
        columnCount={items[0].length}
        columnWidth={150}
        height={600}
        rowCount={items.length - 1}
        rowHeight={35}
        width={600}
        itemData={items.slice(1)}
      >
        {Cell}
      </FixedSizeGrid>
    </>
  )
}

export default Grid
