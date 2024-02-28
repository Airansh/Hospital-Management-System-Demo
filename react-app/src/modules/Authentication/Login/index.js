import { useState } from "react";
import "./styles/loginStyles.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/auth";

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const loginData = await loginUser(email, password)
      if (loginData['message'] === 'Invalid username or password'){
        alert('Invalid username or password')  
      }
      else {
        //Impliment login logic
      }

    } catch(error){
      console.log(error)
    }
  };

  return (
    <>
      <div className="title">
        <h1>Login</h1>
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
        <div className="button-container">
          <button type="submit">Login</button>
          <button type="button" onClick={() => nav('/forgotpassword')}>Forgot Password</button> 
        </div>
      </form>
      <div className="signup-link">
        <p>
          Don't have an account?{" "}
          <button onClick={() => nav('/signup')}>Sign up</button>
        </p>
      </div>
    </>
  );
}

export default Login;
