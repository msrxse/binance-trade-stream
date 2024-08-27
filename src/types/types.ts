// type Trade = {
//   E: number
//   M: boolean
//   T: number
//   e: string
//   m: boolean
//   p: string // should be number
//   q: string // should be number
//   s: string
//   t: number
// }

type TraceDictionary = Record<string, Trade>
// type VisibleTraceDictionary = Record<string, VisibleTrade>

type Trade = {
  E: number
  p: number
  q: string
  t: number
}

// {
//   "e": "trade",
//   "E": 1724768953627,
//   "s": "BNBBTC",
//   "t": 256329628,
//   "p": "0.00891600",
//   "q": "0.40000000",
//   "T": 1724768953626,
//   "m": false,
//   "M": true
// }

export type { Trade, TraceDictionary }
