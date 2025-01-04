import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Login from '../components/Login';
import { login } from '../features/authSlice';
import userEvent from '@testing-library/user-event';

// Set up Redux mock store
const store = createStore((state = {}, action) => {
  if (action.type === login().type) {
    return { auth: { isAuthenticated: true } };
  }
  return state;
});

test('renders login form', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
});

test('validates required fields', async () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  userEvent.click(screen.getByRole('button', { name: /sign in/i }));

  await waitFor(() => {
    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });
});

test('displays success message on valid login', async () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  userEvent.type(screen.getByLabelText(/username/i), 'haulmatic');
  userEvent.type(screen.getByLabelText(/password/i), '123456');
  userEvent.click(screen.getByRole('button', { name: /sign in/i }));

  await waitFor(() => {
    expect(screen.queryByText(/Login successful!/i)).toBeInTheDocument();
  });
});
