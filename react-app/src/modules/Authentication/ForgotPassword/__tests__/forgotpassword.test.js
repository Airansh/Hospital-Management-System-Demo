
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers like toBeInTheDocument
import ForgotPassword from '../../ForgotPassword';

describe('ForgotPassword Component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<ForgotPassword />);
  });

  it('renders without crashing', () => {
    expect(screen.getByText('Forgot Password')).toBeInTheDocument();
  });

  it('renders email input', () => {
    const emailInput = screen.getByLabelText('Email:');
    expect(emailInput).toBeInTheDocument();
  });

  it('renders security answer input', () => {
    const answerInput = screen.getByLabelText('What is the year you were born in?');
    expect(answerInput).toBeInTheDocument();
  });

  it('renders submit button', () => {
    const submitButton = screen.getByText('Update Password');
    expect(submitButton).toBeInTheDocument();
  });

  it('handles email input correctly', () => {
    const emailInput = screen.getByLabelText('Email:');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('handles security answer input correctly', () => {
    const answerInput = screen.getByLabelText('What is the year you were born in?');
    fireEvent.change(answerInput, { target: { value: '1990' } });
    expect(answerInput.value).toBe('1990');
  });


});
