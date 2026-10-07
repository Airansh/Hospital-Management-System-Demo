import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from '../../../../test-utils/renderWithRouter';
import SignUp from '../index';

describe('SignUp Component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    renderWithRouter(<SignUp />, { route: '/signup' });
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

describe('SignUp behaviour', () => {
  afterEach(() => jest.restoreAllMocks());

  it('does not let the client choose a role', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ message: 'Signup successful' }),
    });
    renderWithRouter(<SignUp />, { route: '/signup' });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'n@x.com' } });
    fireEvent.change(screen.getByLabelText('What year were you born in?'), { target: { value: '1999' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'pw' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    expect(await screen.findByText('Login Page')).toBeInTheDocument();
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toEqual({ username: 'n@x.com', email_id: 'n@x.com', password: 'pw', security_ans1: '1999' });
  });
});
