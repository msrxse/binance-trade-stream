import { createRef, useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { FixedSizeGrid } from 'react-window'

import { Trade } from '@/types/types'

import styles from './App.module.css'
import List from './components/List/List'
import useTradeData, { addTrade } from './hooks/useTradeData'

function App() {
  const gridRef = createRef<FixedSizeGrid>()

  const [tradingPair] = useState('bnbbtc')
  const { gridState, dispatch } = useTradeData()

  const { lastJsonMessage } = useWebSocket(
    `wss://stream.binance.com:9443/ws/${tradingPair}@trade`,
    {
      shouldReconnect: () => true,
      reconnectInterval: 3000,
    },
  )

  useEffect(() => {
    if (lastJsonMessage !== null) {
      addTrade(dispatch, lastJsonMessage as Trade)
    }
  }, [dispatch, lastJsonMessage])

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollToItem({
        align: 'start',
        rowIndex: gridState.length,
      })
    }
  }, [gridRef, gridState])

  return (
    <div className={styles.app}>
      <h1>Binance Trades Stream</h1>
      <List gridRef={gridRef} items={gridState} />
    </div>
  )
}

export default App
