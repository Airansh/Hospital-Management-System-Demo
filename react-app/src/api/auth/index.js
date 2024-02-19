const baseUrl = 'http://localhost:3001'

export async function signIn(username, password) {
    try {
      const response = await fetch(`${baseUrl}/api/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Sign-in successful
        console.log('Sign-in successful:', data);
        // Handle successful sign-in (e.g., store user data, redirect)
      } else {
        // Sign-in failed
        console.error('Sign-in failed:', data.error);
        // Display error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors
    }
  }

export async function createAccount(username, password, role, email_id, security_ans1, security_ans2) {
    try {
      const response = await fetch(`${baseUrl}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          role,
          email_id,
          security_ans1,
          security_ans2,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Account created successfully
        console.log('Account created successfully:', data);
        // Handle successful account creation (e.g., redirect, display success message)
      } else {
        // Account creation failed
        console.error('Account creation failed:', data.error);
        // Display error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors
    }
  }
