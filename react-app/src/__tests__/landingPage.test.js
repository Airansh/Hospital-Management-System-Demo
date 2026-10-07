import { fireEvent, screen } from '@testing-library/react';
import MedcareApp from '../modules/LandingPage';
import { DOCTORS, SERVICES, REVIEWS } from '../modules/LandingPage/content';
import { renderWithRouter } from '../test-utils/renderWithRouter';

describe('Landing page', () => {
  beforeEach(() => renderWithRouter(<MedcareApp />));
  afterEach(() => jest.restoreAllMocks());

  it('renders every service, doctor and review from the content module', () => {
    SERVICES.forEach(({ title }) => expect(screen.getAllByText(title).length).toBeGreaterThan(0));
    DOCTORS.forEach(({ name }) => expect(screen.getByText(name)).toBeInTheDocument());
    REVIEWS.forEach(({ name }) => expect(screen.getByText(name)).toBeInTheDocument());
  });

  it('links to the login and sign-up pages', () => {
    expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute('href', '/login');
    expect(screen.getByRole('link', { name: 'Sign Up' })).toHaveAttribute('href', '/signup');
  });

  it('confirms an appointment request without reloading the page', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.change(screen.getByPlaceholderText('your name'), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByPlaceholderText('your number'), { target: { value: '3190000000' } });
    fireEvent.change(screen.getByPlaceholderText('your email'), { target: { value: 'ana@x.com' } });
    fireEvent.submit(screen.getByRole('button', { name: 'book now' }).closest('form'));
    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Ana'));
    expect(screen.getByPlaceholderText('your name')).toHaveValue('');
  });
});
