/* eslint-disable testing-library/prefer-screen-queries */
// SignUp.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers like toBeInTheDocument
import SignUp from '../../SignUp';

describe('SignUp Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<SignUp />);
    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  it('handles email input correctly', () => {
    const { getByLabelText } = render(<SignUp />);
    const emailInput = getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('handles password input correctly', () => {
    const { getByLabelText } = render(<SignUp />);
    const passwordInput = getByLabelText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    expect(passwordInput.value).toBe('testPassword');
  });

  it('handles question input correctly', () => {
    const { getByLabelText } = render(<SignUp />);
    const questionInput = getByLabelText('What year were you born in?');
    fireEvent.change(questionInput, { target: { value: '1990' } });
    expect(questionInput.value).toBe('1990');
  });

  it('toggles password visibility', () => {
    const { getByLabelText, getByTestId } = render(<SignUp />);
    const passwordInput = getByLabelText('Password:');
    const togglePasswordButton = getByTestId('toggle-password');

    expect(passwordInput.type).toBe('password');

    fireEvent.click(togglePasswordButton);

    expect(passwordInput.type).toBe('text');
  });

  it('submits the form', () => {
    const { getByLabelText, getByText } = render(<SignUp />);
    const emailInput = getByLabelText('Email:');
    const questionInput = getByLabelText('What year were you born in?');
    const passwordInput = getByLabelText('Password:');
    const submitButton = getByText('Create Account');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(questionInput, { target: { value: '1990' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    fireEvent.click(submitButton);

    // You might want to add more assertions based on the expected behavior
    // For example, you can check if a function that should be called upon submission is called.
  });
});
