import { render, screen } from '@testing-library/react'

import Grid from './Grid'

describe('App', () => {
  const items = [
    ['Id', 'Price', 'Quantity', 'Time'],
    [1724839665316, '0.0091', '3.0000', '28/08/2024, 11:07:45'],
  ]
  const gridProps = {
    gridRef: null,
    items,
  }
  test('displays headers correctly', () => {
    render(<Grid {...gridProps} />)

    const headerCell1 = screen.getByText('Id')
    const headerCell2 = screen.getByText('Price')
    const headerCell3 = screen.getByText('Quantity')
    const headerCell4 = screen.getByText('Time')

    expect(headerCell1).toBeInTheDocument()
    expect(headerCell2).toBeInTheDocument()
    expect(headerCell3).toBeInTheDocument()
    expect(headerCell4).toBeInTheDocument()

    expect(screen.getByTestId('headerCell-0-0')).toBeInTheDocument()
    expect(screen.getByTestId('headerCell-0-1')).toBeInTheDocument()
    expect(screen.getByTestId('headerCell-0-2')).toBeInTheDocument()
    expect(screen.getByTestId('headerCell-0-3')).toBeInTheDocument()
  })

  test('displays first row correctly', () => {
    render(<Grid {...gridProps} />)

    const row1Cell1 = screen.getByText(1724839665316)
    const row1Cell2 = screen.getByText('0.0091')
    const row1Cell3 = screen.getByText('3.0000')
    const row1Cell4 = screen.getByText('28/08/2024, 11:07:45')

    expect(row1Cell1).toBeInTheDocument()
    expect(row1Cell2).toBeInTheDocument()
    expect(row1Cell3).toBeInTheDocument()
    expect(row1Cell4).toBeInTheDocument()

    expect(screen.getByTestId('rowCell-0-0')).toBeInTheDocument()
    expect(screen.getByTestId('rowCell-0-1')).toBeInTheDocument()
    expect(screen.getByTestId('rowCell-0-2')).toBeInTheDocument()
    expect(screen.getByTestId('rowCell-0-3')).toBeInTheDocument()
  })
})
