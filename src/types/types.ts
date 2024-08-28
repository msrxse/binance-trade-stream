type TraceDictionary = Record<string, Trade>

type Trade = {
  E: number
  p: string
  q: string
  T: number
}

type TradeResponse = {
  e: string
  E: number
  s: string
  t: number
  p: string
  q: string
  T: number
  m: boolean
  M: boolean
}

type GridArray = (string | number)[][]

export type { Trade, TradeResponse, TraceDictionary, GridArray }
