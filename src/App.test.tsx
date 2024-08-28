import { render, screen, waitFor } from '@testing-library/react'

import App from '@/App'

describe('App', () => {
  test('displays title', async () => {
    render(<App />)
    const title = await waitFor(() => screen.getByText('Binance Trades Stream'))
    expect(title).toBeInTheDocument()
  })
})
