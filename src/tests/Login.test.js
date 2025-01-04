import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Login from '../components/Login';
import { login } from '../features/authSlice';
import userEvent from '@testing-library/user-event';

// Set up Redux mock store
const store = createStore((state = { auth: { isAuthenticated: false } }, action) => {
  if (action.type === login().type) {
    return { auth: { isAuthenticated: true } }; // Simulating successful login state change
  }
  return state;
});

test('renders login form', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  
  // Check if the required elements are rendered
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

  // Click the Sign In button without entering any fields
  userEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Check that the validation message is shown for required fields
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

  // Simulate typing into the username and password fields
  userEvent.type(screen.getByLabelText(/username/i), 'haulmatic');
  userEvent.type(screen.getByLabelText(/password/i), '123456');

  // Click the Sign In button
  userEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Wait for the success message or status change in the component
  await waitFor(() => {
    expect(screen.queryByText(/Login successful!/i)).toBeInTheDocument();
  });
});

test('shows error message on failed login attempt', async () => {
  // Simulate failed login by passing incorrect credentials
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  userEvent.type(screen.getByLabelText(/username/i), 'wronguser');
  userEvent.type(screen.getByLabelText(/password/i), 'wrongpassword');
  userEvent.click(screen.getByRole('button', { name: /sign in/i }));

  // Check for failure message or error handling
  await waitFor(() => {
    expect(screen.queryByText(/Invalid username or password/i)).toBeInTheDocument();
  });
});
