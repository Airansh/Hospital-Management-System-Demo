// Import necessary libraries and functions for testing
import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../../../../test-utils/renderWithRouter';
import Login from '../../Login';

describe('Login Component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    renderWithRouter(<Login />, { route: '/login' });
  });

  it('renders without crashing', () => {
    expect(screen.getByText('Login Here')).toBeInTheDocument();
  });

  it('renders email input', () => {
    const emailInput = screen.getByLabelText('Email:');
    expect(emailInput).toBeInTheDocument();
  });

  it('renders password input', () => {
    const passwordInput = screen.getByLabelText('Password:');
    expect(passwordInput).toBeInTheDocument();
  });

  it('renders forgot password link', () => {
    const forgotPasswordLink = screen.getByText('Forgot Password');
    expect(forgotPasswordLink).toBeInTheDocument();
  });

  it('handles email input correctly', () => {
    const emailInput = screen.getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('handles password input correctly', () => {
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    expect(passwordInput.value).toBe('testPassword');
  });

});

describe('Login behaviour', () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });
  afterEach(() => jest.restoreAllMocks());

  const submit = (email, password) => {
    renderWithRouter(<Login />, { route: '/login' });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: email } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: password } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
  };

  it('stores the session and redirects a patient to their dashboard', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ message: 'Login successful', user: { username: 'p@x.com', role: 'patient' } }),
    });
    submit('p@x.com', 'pw');
    expect(await screen.findByText('Patient Home')).toBeInTheDocument();
    expect(sessionStorage.getItem('role')).toBe('patient');
  });

  it('shows the server message on invalid credentials', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Invalid username or password' }),
    });
    submit('p@x.com', 'bad');
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Invalid username or password'));
    expect(sessionStorage.getItem('isLoggedIn')).toBeNull();
  });

  it('reports when the server is down', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'));
    submit('p@x.com', 'pw');
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/server is currently down/i)));
  });
});
