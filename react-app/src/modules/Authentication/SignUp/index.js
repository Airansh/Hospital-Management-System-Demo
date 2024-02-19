import { useState } from "react";
import "./styles/loginStyles.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../../../api/auth";

function SignUp() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [ans1, setAns1] = useState('')
  const [ans2, setAns2] = useState('')
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleQuestion1Change = (e) => {
    setAns1(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    createAccount(email, password, 'patient', email, ans1, ans2)
  };

  return (
    <>
      <div className="title">
        <h1>Sign Up</h1>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <br />
        <label>
          What is the year you were born in?
          <input
            value={ans1}
            onChange={handleQuestion1Change}
            required
          />
        </label>
        <br/>
        <label className="password-label">
          Password:
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <div className="toggle-password" onClick={handleTogglePassword}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </label>
        <br />
        <button type="submit">Create Account</button>
      </form>
      <div className="signup-link">
        <p>
          Already Have an Account?{" "}
          <button onClick={() => nav('/login')}>Sign up</button>
        </p>
      </div>
    </>
  );
}

export default SignUp;
