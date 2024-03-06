import { useState } from "react";
import "./styles/signupStyles.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createAccount } from "../../../api/auth";

function SignUp() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData ={
        username: email,
        password: password,
        role: 'patient',
        email_id: email,
        security_ans1: ans1,
        security_ans2: ans2
    }
    try {
        const createAccountData = await createAccount(userData)
        //handle signup
        if (createAccountData['message'] === 'Internal server error') {
          alert('User already exisits or server error')
        } else {
          console.log(createAccountData)
          alert('Account created successfully')
          window.location.href = '/login';
        }
    } catch(error){
        console.log(error)
        alert(error)
    }
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
          What year were you born in?
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
          <a className="redirect" type='button' href="login">Login</a>
        </p>
      </div>
    </>
  );
}

export default SignUp;
