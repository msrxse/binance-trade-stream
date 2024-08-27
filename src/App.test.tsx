import { render, screen } from '@testing-library/react'

import App from '@/App'

describe('App', () => {
  test('should work as expected', () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })
})
