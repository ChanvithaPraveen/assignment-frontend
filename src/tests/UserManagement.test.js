import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import UserManagement from '../components/UserManagement';
import { createUser, deleteUser, updateUser } from '../features/userSlice';
import userEvent from '@testing-library/user-event';

// Set up Redux mock store
const store = createStore((state = { users: [] }, action) => {
  switch (action.type) {
    case createUser().type:
      return { users: [...state.users, action.payload] };
    case updateUser().type:
      return {
        users: state.users.map((u) =>
          u.id === action.payload.id ? { ...u, ...action.payload.newData } : u
        ),
      };
    case deleteUser().type:
      return { users: state.users.filter((u) => u.id !== action.payload) };
    default:
      return state;
  }
});

test('renders user management form', () => {
  render(
    <Provider store={store}>
      <UserManagement />
    </Provider>
  );

  expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
});

test('creates a new user', async () => {
  render(
    <Provider store={store}>
      <UserManagement />
    </Provider>
  );

  userEvent.type(screen.getByPlaceholderText(/first name/i), 'John');
  userEvent.type(screen.getByPlaceholderText(/last name/i), 'Doe');
  userEvent.click(screen.getByRole('button', { name: /create/i }));

  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});

test('updates a user', async () => {
  render(
    <Provider store={store}>
      <UserManagement />
    </Provider>
  );

  // Add a user first
  store.dispatch(createUser({ id: 1, firstName: 'John', lastName: 'Doe' }));

  // Now update the user
  userEvent.click(screen.getByText('Edit'));
  userEvent.clear(screen.getByPlaceholderText(/first name/i)); // Clear the existing name
  userEvent.type(screen.getByPlaceholderText(/first name/i), 'Jane');
  userEvent.click(screen.getByRole('button', { name: /update/i }));

  await waitFor(() => {
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });
});

test('deletes a user', async () => {
  render(
    <Provider store={store}>
      <UserManagement />
    </Provider>
  );

  // Add a user first
  store.dispatch(createUser({ id: 1, firstName: 'John', lastName: 'Doe' }));

  userEvent.click(screen.getByText('Delete'));

  await waitFor(() => {
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });
});
