import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import PasswordInput from "../PasswordInput";
import { loginUser } from "../../../api/auth";
import { homeForRole, saveSession } from "../../../authentication_rules/session";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // ERROR HANDLING LAYER : wrong email and/or password, or server down
    try {
      const { user } = await loginUser(email, password);
      saveSession(user);
      // BUSINESS RULES LAYER : each role lands on its own dashboard
      navigate(homeForRole(user.role), { replace: true });
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
        <h1>Login Here</h1>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <PasswordInput label="Password:" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <div className="button-container">
          <button type="submit" disabled={submitting}>Login</button>
          <Link className="redirect" to="/forgotpassword">Forgot Password</Link>
        </div>
      </form>
      <div className="signup-link">
        <p>
          Don't have an account? <Link className="redirect" to="/signup">Sign up</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
