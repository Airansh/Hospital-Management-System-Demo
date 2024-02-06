import {BrowserRouter, Route, Routes} from 'react-router-dom'

import './App.css'

import SignUp from './modules/Authentication/SignUp';
import Login from './modules/Authentication/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Unprotected Routes */}
          <Route path='*' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
