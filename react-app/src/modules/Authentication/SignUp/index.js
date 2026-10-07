import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import PasswordInput from "../PasswordInput";
import { createAccount } from "../../../api/auth";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [securityAns1, setSecurityAns1] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // The server decides the role; self sign-up always creates a patient account.
    try {
      await createAccount({ email, password, securityAns1 });
      alert("Account created successfully");
      navigate("/login");
    } catch (error) {
      alert(error.status === 409 ? "User already exists" : error.message);
    } finally {
      setSubmitting(false);
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
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          What year were you born in?
          <input value={securityAns1} onChange={(e) => setSecurityAns1(e.target.value)} required />
        </label>
        <br />
        <PasswordInput label="Password:" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit" disabled={submitting}>Create Account</button>
      </form>
      <div className="signup-link">
        <p>
          Already Have an Account? <Link className="redirect" to="/login">Login</Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
