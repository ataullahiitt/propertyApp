import { Navigate, Outlet } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import Transaction from './pages/Transaction';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/user/Profile';
import ChangePassword from './pages/user/ChangePassword';
import AddProperty from './pages/property/AddProperty';
import PayRent from './pages/PayRent';
import { PropertyContextProvider } from './store/property-context';

const routes = (isLoggedIn) => {

    return [
        {
            path: '/',
            element: isLoggedIn ? <PropertyContextProvider><DefaultLayout /></PropertyContextProvider> : <Navigate to="/login" />,
            children: [
                { path: '/', element: <Transaction /> },
                { path: '/transaction', element: <Transaction /> },
                { path: '/profile', element: <Profile /> },
                { path: '/changePassword', element: <ChangePassword /> },
                { path: '/addNewProperty', element: <AddProperty /> },
                { path: '/payRent/:id', element: <PayRent /> }
            ]
        },
        {
            path: '/login',
            element: !isLoggedIn ? <Login /> : <Navigate to="/transaction" />
        },
        {
            path: '/register',
            element: <Register />
        }
    ];
}

export default routes;