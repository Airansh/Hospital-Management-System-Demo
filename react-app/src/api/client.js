import { API_URL } from '../config';

// ERROR HANDLING LAYER: every failed request becomes an ApiError with a
// user-readable message, so UI components only need a single catch.
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const SERVER_DOWN_MESSAGE = 'Server is currently down. Please try again later.';

export const postJson = async (path, body) => {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw new ApiError(SERVER_DOWN_MESSAGE, 0);
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(data.message || `Request failed (${response.status})`, response.status);
  }
  return data;
};
