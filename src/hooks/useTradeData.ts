import { useReducer } from 'react'

import { TraceDictionary, Trade } from '@/types/types'

type Action = { type: 'add'; payload: Trade } | { type: 'delete'; payload: Trade }
type State = TraceDictionary
type Dispatch = (action: Action) => void

function normalizedValueReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const trade = action.payload
      const withFilteredProperties = Object.keys(trade)
        .filter((key) => ['E', 'p', 'q', 't'].includes(key))
        .reduce((obj, key) => {
          return Object.assign(obj, {
            [key]: trade[key as keyof Trade],
          })
        }, {})

      return {
        ...state,
        [trade.E]: withFilteredProperties,
      }
    }
    case 'delete': {
      return state
    }
    default: {
      return state
    }
  }
}

function useTradeData() {
  const [state, dispatch] = useReducer(normalizedValueReducer, {})

  const gridState = [
    ['Id', 'Price', 'Quantity', 'Time'],
    ...Object.values(state).map((each) => {
      return Object.values(each)
    }),
  ]

  const value = { gridState, dispatch }
  return value
}

const addTrade = (dispatch: Dispatch, payload: Trade) => dispatch({ type: 'add', payload })
const deleteTrade = (dispatch: Dispatch, payload: Trade) => dispatch({ type: 'delete', payload })

export { addTrade, deleteTrade }
export default useTradeData
