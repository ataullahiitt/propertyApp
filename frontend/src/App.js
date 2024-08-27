import { useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import AuthContext from './store/auth-context';

function App() {

  const authCtl = useContext(AuthContext);
  const routing = useRoutes(routes(authCtl.isLoggedIn));

  return (
    <>
      {routing}
    </>
  );
}
export default App;



/*
import DefaultLayout from './layout/DefaultLayout';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';

import Transaction from './pages/Transaction';

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="/" element={<DefaultLayout />} >
        <Route path="transaction" element={<Transaction />} />
      </Route>

      <Route element={<DefaultLayout />} />
    </Routes>
  );
}

export default App;
*/