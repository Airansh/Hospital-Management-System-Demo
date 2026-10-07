// CONTENT LAYER: password field with a show/hide toggle, shared by all auth forms.

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function PasswordInput({ label, value, onChange }) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="password-label">
      {label}
      <div className="password-input-container">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          required
        />
        <button
          type="button"
          className="toggle-password"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
    </label>
  );
}

export default PasswordInput;
