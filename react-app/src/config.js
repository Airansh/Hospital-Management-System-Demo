// HOSTING LAYER: where the API server lives. Override with REACT_APP_API_URL.
export const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:3001/api').replace(/\/$/, '');
