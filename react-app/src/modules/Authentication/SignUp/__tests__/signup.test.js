import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';

describe('SignUp Component', () => {
  test('renders the Sign Up form with correct elements', () => {
    render(<SignUp />);

    const title = screen.getByText(/Sign Up/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const passwordToggle = screen.getByRole('button', { name: /Show Password/i });
    const submitButton = screen.getByRole('button', { name: /Create Account/i });
    const signupLink = screen.getByText(/Already Have an Account\?/i);
    const loginButton = screen.getByRole('button', { name: /Sign up/i });

    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordToggle).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(signupLink).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('can toggle password visibility', () => {
    render(<SignUp />);

    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput.type).toBe('password');

    const passwordToggle = screen.getByRole('button', { name: /Show Password/i });
    fireEvent.click(passwordToggle);
    expect(passwordInput.type).toBe('text');

    fireEvent.click(passwordToggle); // Click again to hide
    expect(passwordInput.type).toBe('password');
  });

  test('updates email state on input change', () => {
    render(<SignUp />);

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(screen.getByLabelText(/Email/i)).toHaveAttribute('value', 'test@example.com');
  });

  test('updates password state on input change', () => {
    render(<SignUp />);

    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(screen.getByLabelText(/Password/i)).toHaveAttribute('value', 'password123');
  });
});