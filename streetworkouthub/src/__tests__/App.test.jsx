import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { BrowserRouter } from 'react-router-dom'

test('renders navigation brand name', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

expect(screen.getByRole('link', { name: /StreetWorkoutHub/i })).toBeInTheDocument();
})
