import { useReducer } from 'react'

import { format } from 'date-fns-tz'

import { TraceDictionary, Trade } from '@/types/types'

type Action = { type: 'add'; payload: Trade } | { type: 'delete'; payload: Trade }
type State = TraceDictionary
type Dispatch = (action: Action) => void

const cellFormatter = (trade: Trade) => {
  const date = new Date(trade['T'])

  return {
    ...trade,
    p: Number(trade.p).toFixed(4),
    q: Number(trade.q).toFixed(4),
    T: format(date, 'dd/MM/yyyy HH:mm:ss'),
  }
}

function normalizedValueReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const trade = action.payload

      const withFilteredProperties = Object.keys(trade)
        .filter((key) => ['E', 'p', 'q', 'T'].includes(key))
        .reduce((obj, key) => {
          return Object.assign(obj, {
            [key]: trade[key as keyof Trade],
          })
        }, {} as Trade)

      return {
        ...state,
        [trade.E]: cellFormatter(withFilteredProperties),
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
