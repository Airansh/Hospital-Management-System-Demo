import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUp from '../index';

describe('SignUp Component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<SignUp />);
  });

  it('renders without crashing', () => {
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('renders email input', () => {
    const emailInput = screen.getByLabelText('Email:');
    expect(emailInput).toBeInTheDocument();
  });

  it('renders question input', () => {
    const questionInput = screen.getByLabelText('What year were you born in?');
    expect(questionInput).toBeInTheDocument();
  });

  it('renders password input', () => {
    const passwordInput = screen.getByLabelText('Password:');
    expect(passwordInput).toBeInTheDocument();
  });

  it('renders submit button', () => {
    const submitButton = screen.getByText('Create Account');
    expect(submitButton).toBeInTheDocument();
  });

  it('renders login link', () => {
    const loginLink = screen.getByText('Already Have an Account?');
    expect(loginLink).toBeInTheDocument();
  });

  it('handles email input correctly', () => {
    const emailInput = screen.getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('handles question input correctly', () => {
    const questionInput = screen.getByLabelText('What year were you born in?');
    fireEvent.change(questionInput, { target: { value: '1990' } });
    expect(questionInput.value).toBe('1990');
  });

  it('handles password input correctly', () => {
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });
    expect(passwordInput.value).toBe('testPassword');
  });

});
