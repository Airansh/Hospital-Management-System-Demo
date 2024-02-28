const apiUrl = 'http://localhost:3001/api'

export const loginUser = async (username, password) => {
  const loginUrl = `${apiUrl}/login`;

  try {
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Login failed');
  }

};

export const createAccount = async (userData) => {
  const signupUrl = `${apiUrl}/signup`;

  try {
    const response = await fetch(signupUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    console.alert(error)
    throw new Error('Signup failed');
  }
};

export const resetPassword = async (username, ans1, newPassword) => {
  const resetPasswordUrl = `${apiUrl}/reset-password`;

  try {
    const response = await fetch(resetPasswordUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, ans1, newPassword }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    console.alert(error)
    throw new Error('Password reset failed');
  }
};
