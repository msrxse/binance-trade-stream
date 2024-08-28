import { act, renderHook } from '@testing-library/react'

import { TradeResponse } from '@/types/types'

import useTradeData, { addTrade } from './useTradeData'

describe('useTradeData', () => {
  it('should return initial Headers', async () => {
    const { result } = renderHook(() => useTradeData())

    expect(result.current.gridState).toHaveLength(1)
    expect(result.current.gridState).toEqual([['Id', 'Price', 'Quantity', 'Time']])
  })

  it('addTrade changes the state as expected', () => {
    const { result } = renderHook(() => useTradeData())
    const trade: TradeResponse = {
      e: 'trade',
      E: 1724838293044,
      s: 'BNBBTC',
      t: 256432956,
      p: '0.00909400',
      q: '0.05000000',
      T: 1724838293044,
      m: false,
      M: true,
    }
    const resultedState = [
      ['Id', 'Price', 'Quantity', 'Time'],
      [1724838293044, '0.0091', '0.0500', '28/08/2024, 10:44:53'],
    ]
    act(() => {
      addTrade(result.current.dispatch, trade)
    })

    expect(result.current.gridState).toEqual(resultedState)
  })
})
