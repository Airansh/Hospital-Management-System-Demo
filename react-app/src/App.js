import {BrowserRouter, Route, Routes} from 'react-router-dom'

import SignUp from './modules/SignUp';
import Login from './modules/Login';

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
