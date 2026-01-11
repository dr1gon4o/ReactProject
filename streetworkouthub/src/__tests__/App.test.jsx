import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import  store  from "../store/store";


test('renders navigation brand name', () => {
  render(
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  )

expect(screen.getByRole('link', { name: /StreetWorkoutHub/i })).toBeInTheDocument();
})
