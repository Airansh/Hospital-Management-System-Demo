export const login_query = 'SELECT * FROM login_cred WHERE username = ?'

export const signup_query = 'INSERT INTO login_cred (username, password, role, email_id, security_ans1, security_ans2) VALUES (?, ?, ?, ?, ?, ?)'

export const forgotPassword_query = 'UPDATE login_cred SET password = ? WHERE username = ? AND security_ans1 = ?'
