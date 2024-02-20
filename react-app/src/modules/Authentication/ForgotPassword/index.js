import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../api/auth";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [ans1, setAns1] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleAnswerChange = (e) => setAns1(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const forgot = await resetPassword(email, ans1, newPassword);
      console.log(forgot);
      // Redirect or show success message
    } catch (error) {
      console.error('Error resetting password:', error);
      // Handle error - Redirect or show error message
    }
  };

  return (
    <>
      <div className="title">
        <h1>Forgot Password</h1>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        <br />
        <label>
          What is the year you were born in?
          <input value={ans1} onChange={handleAnswerChange} required />
        </label>
        <br />
        <label className="password-label">
          New Password:
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
            />
            <div className="toggle-password" onClick={handleTogglePassword}>
              {showPassword ? "Hide" : "Show"}
            </div>
          </div>
        </label>
        <br />
        <button type="submit">Update Password</button>
      </form>
      <div className="signup-link">
        <p>
          Remembered your password?{" "}
          <button onClick={() => navigate('/login')}>Login</button>
        </p>
      </div>
    </>
  );
}

export default ForgotPassword;