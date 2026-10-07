// CONTENT LAYER: reusable dashboard shell shared by every role.

import { useNavigate } from 'react-router-dom';
import { clearSession, getSession } from '../../authentication_rules/session';

function Dashboard({ title }) {
  const navigate = useNavigate();
  const { username } = getSession();

  const handleLogout = () => {
    clearSession();
    navigate('/login', { replace: true });
  };

  return (
    <div className="app-container">
      <h1>{title}</h1>
      {username && <p>Signed in as {username}</p>}
      <button type="button" onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default Dashboard;
