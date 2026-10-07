// BUSINESS RULES LAYER: who is logged in, and where each role lands after login.

export const ROLE_HOME = Object.freeze({
  patient: '/patient',
  provider: '/provider',
  admin: '/admin',
});

const KEYS = ['isLoggedIn', 'role', 'username'];

export const saveSession = (user) => {
  sessionStorage.setItem('isLoggedIn', 'true');
  sessionStorage.setItem('role', user.role);
  sessionStorage.setItem('username', user.username);
};

export const getSession = () => ({
  isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true',
  role: sessionStorage.getItem('role'),
  username: sessionStorage.getItem('username'),
});

export const clearSession = () => KEYS.forEach((key) => sessionStorage.removeItem(key));

export const homeForRole = (role) => ROLE_HOME[role] ?? '/';
