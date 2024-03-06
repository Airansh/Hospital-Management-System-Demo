// Import necessary libraries and functions for testing
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers like toBeInTheDocument
import Login from '../../Login';

describe('Login Component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Login />);
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
