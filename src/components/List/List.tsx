import { FixedSizeGrid } from 'react-window'

import { Trade } from '@/types/types'

const Cell = ({ columnIndex, rowIndex, style, data }) => {
  const row = data[rowIndex][columnIndex]

  return <div style={style}>{row}</div>
}

const List = ({ gridRef, items }: { gridRef: any; items: (string | number)[][] }) => {
  if (items.length === 0) {
    return null
  }

  return (
    <FixedSizeGrid
      ref={gridRef}
      columnCount={items[0].length}
      columnWidth={150}
      height={600}
      rowCount={items.length}
      rowHeight={35}
      width={600}
      itemData={items}
    >
      {Cell}
    </FixedSizeGrid>
  )
}

export default List
