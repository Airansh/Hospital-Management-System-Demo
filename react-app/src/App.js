import {BrowserRouter, Route, Routes} from 'react-router-dom'

import './App.css'

import SignUp from './modules/Authentication/SignUp';
import Login from './modules/Authentication/Login';
import ForgotPassword from './modules/Authentication/ForgotPassword';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Unprotected Routes */}
          <Route path='*' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
