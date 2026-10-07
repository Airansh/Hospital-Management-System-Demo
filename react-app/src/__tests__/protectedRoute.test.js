import { screen } from '@testing-library/react';
import ProtectedRoute from '../authentication_rules/protected_routes';
import { renderWithRouter } from '../test-utils/renderWithRouter';

const renderProtected = () =>
  renderWithRouter(
    <ProtectedRoute allowedRoles={['provider']}><h1>Secret</h1></ProtectedRoute>,
    { route: '/provider' }
  );

describe('ProtectedRoute', () => {
  beforeEach(() => sessionStorage.clear());

  it('redirects anonymous users to login', () => {
    renderProtected();
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('redirects users with the wrong role', () => {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('role', 'patient');
    renderProtected();
    expect(screen.queryByText('Secret')).not.toBeInTheDocument();
  });

  it('renders the page for an allowed role', () => {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('role', 'provider');
    renderProtected();
    expect(screen.getByText('Secret')).toBeInTheDocument();
  });
});
