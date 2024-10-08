# Binance Trade Stream

binance-trade-stream is a React application that displays trade data for the BNB/BTC trading pair from Binance.

## To start

Vite should have started dev server, otherwise: To start development server:

```
[npm/yarn/pnpm] run dev
```

Next, open your browser and visit http://localhost:4000/.

## Tests

```
[npm/yarn/pnpm] test:watch

```

or

```
[npm/yarn/pnpm] test:watch <path-to-file>

```

# About

binance-trade-stream is a React application that displays trade data for the BNB/BTC trading pair from Binance.
Connecting to its WebSocket API and receiving real-time data.
The application displays a list of the latest trades. Each trade should display the following information:
• Trade ID
• Price
• Quantity
• Time
The list updates in real-time as new trades come in from the WebSocket connection.

# Notes

## General architecture and scaffolding

- Initial scaffolding is a repo of mine that I use for very small personal projects. [here](https://github.com/msrxse/default-scaffold). Removed Axios, MSW and React-query.
- All starts on `App.tsx` where we use _react-use-websocket_ library to connect to Binance's trade Websockets API and retrieve live data. Then, incoming messages get redirected to the useTradeData custom hook, showcasing a state module function (a variant of the context module function pattern). This hooks processes incoming data and internally saves its state. The exposed state is the actual data in the format that the grid will consume it.
- About _react-use-websocket_ library: It provides a robust WebSocket integrations to your React Components. The App will rerender every time the the WebSocket receives a message (which will change _lastJsonMessage_). Right now we are not sending messages but _sendMessage_ could do it, and that is a memoized callback that will pass the message to the current WebSocket. Note that, _useWebSocket_ will manage subscriptions/unsubscriptions internally. _useWebSocket_ will keep track of how many subscribers any given WebSocket has and will automatically free it from memory once there are no subscribers remaining (a subscriber unsubscribes when it either unmounts or changes its socketUrl). So everytime we change its socketUrl, the connection will be automatically freed.
- About _react-window_: This is the library I use to display a grid with the incoming processed data. Its input data is in the shape of an array of arrays, being each array a particular row, the first row should be the headers as it is in order. This library uses windowing techniques to remove from the DOM before and after rows not visible on the window at any given moment. Allowing resources to be freed from the browser and not block the user actions as the list becomes very big.

## About useTradeData hook

- The _useTradeData_ custom hook implements a version of the _context-module-function_ where I have removed the context, for simplicity. This hook exposes an API and keeps important state internal to the component, exposing only the helper functions required to make changes on the state. Those helper functions will be stable, because they are exported and imported on usage, as well as the required _dispatch_ function needed to call these helper fns.
- The formatting done on cell data is representative and obviously not something suitable for a production setting

## About testing

- Tests on custom hooks made with renderHook helper from @testing-library/react.
- This app does not use providers so this simplifies testing.

## Bonus

- [ ] Implement a feature to switch between different trading pairs (e.g., ETH/BTC, LTC/BTC).
- Note: Switching between trading pairs would be very easy, would just need to change the tradingPair state on App.tsx and the connection would itself free itself and make a new one to the latest endpoint. Also implement a button to change that state, of course
- [ ] Add a chart to visualize the price changes over time
- Note: Would need to keep price changes on an array instead of overriding incoming messages under same id. Then implement a chart component of course

## Tooling:

- **Vite:** Frontend build tool that serves your source files over native ES modules, with rich features and fast _Hot Module Replacement (HMR)_. _Vite_ is fast because it doesn't bundle your code at all. It leverages the native support for ESM (ECMAScript Modules) of modern browsers. It sends your file directly without being bundled
- **@vitejs/plugin-react-swc:** This speeds up your Vite dev server with [SWC](https://swc.rs/) _(~20x faster than Babel)_
- **ESLint and Prettier:** For linting and pretty-printing JavaScript code respectively
- **Jest and @testing-library/react:** for unit testing
- **Vitest:** Modern testing framework
- **MSW:** Mock Service Worker (MSW) is an API mocking library for browser and Node.js. See [stop mocking fetch](https://kentcdodds.com/blog/stop-mocking-fetch). With MSW, you can intercept outgoing requests, observe them, and respond to them using mocked responses. MSW can integrate throughout your entire stack, allowing you to reuse and customize network behavior on demand. Imagine using the same API mocks during development, integration and end-to-end testing, and then in your Storybook or during a live demo.

## Useful links

- [How to set up a react project with vite](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-vite)
- [Adding eslint and prettier to a vitejs react project](https://dev.to/marcosdiasdev/adding-eslint-and-prettier-to-a-vitejs-react-project-2kkj)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
- [How to setup MSW in a React project using Vite](https://www.raisiqueira.io/drops/vite-msw)
- [Vitest](https://vitest.dev/guide/#overview)
