import { FixedSizeGrid } from 'react-window'

import styles from './List.module.css'

type GridArray = (string | number)[][]

type CellProps = {
  columnIndex: number
  rowIndex: number
  style: {
    position: string
    left: number
    top: number
    height: number
    width: number
  }
  data: GridArray
}

const Cell = ({ columnIndex, rowIndex, style, data }: CellProps) => {
  const row = data[rowIndex][columnIndex]

  return (
    <div
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

const List = ({
  gridRef,
  items,
}: {
  gridRef: React.RefObject<FixedSizeGrid & { _outerRef: HTMLDivElement }>
  items: GridArray
}) => {
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

export default List
