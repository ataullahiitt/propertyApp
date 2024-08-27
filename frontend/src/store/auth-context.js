import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    userData: null,
    login: (token) => { },
    logout: () => { }
});

export const AuthContextProvider = (props) => {

    const initialToken = localStorage.getItem('token');
    const initialUserData = localStorage.getItem('userData');

    const [token, setToken] = useState(initialToken);
    const [userData, setUserData] = useState(JSON.parse(initialUserData));
    const userIsLoggedIn = !!token;

    const loginHandler = (userData) => {

        const { token, user } = userData;
        setToken(token);
        setUserData(user);

        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(user));
    }
    const logoutHandler = () => {
        setToken(null);
        setUserData(null)
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
    }

    const contextValue = {
        token: token,
        userData: userData,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>

}

export default AuthContext;
