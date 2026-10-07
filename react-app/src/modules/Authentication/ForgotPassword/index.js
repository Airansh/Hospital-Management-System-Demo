import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import PasswordInput from "../PasswordInput";
import { resetPassword } from "../../../api/auth";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [ans1, setAns1] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // ERROR HANDLING LAYER : wrong email or security answer
    try {
      await resetPassword(email, ans1, newPassword);
      alert("Password reset successful");
      navigate("/login");
    } catch (error) {
      // MESSAGE LAYER
      alert(error.message);
    } finally {
      setSubmitting(false);
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
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          What is the year you were born in?
          <input value={ans1} onChange={(e) => setAns1(e.target.value)} required />
        </label>
        <br />
        <PasswordInput label="New Password:" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <br />
        <button type="submit" disabled={submitting}>Update Password</button>
      </form>
      <div className="signup-link">
        <p>
          Remembered your password? <Link className="redirect" to="/login">Login</Link>
        </p>
      </div>
    </>
  );
}

export default ForgotPassword;
