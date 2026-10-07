import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Renders `ui` at `route`, plus stub pages so tests can assert on navigation.
export const renderWithRouter = (ui, { route = '/', path = route } = {}) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={path} element={ui} />
        <Route path="/login" element={path === '/login' ? ui : <h1>Login Page</h1>} />
        <Route path="/patient" element={<h1>Patient Home</h1>} />
        <Route path="*" element={<h1>Other Page</h1>} />
      </Routes>
    </MemoryRouter>
  );
