import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const weHavetokeInStorage = localStorage.getItem('fire-token');
  const [token, setToken] = useState(weHavetokeInStorage || '');
  const isLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('fire-token', token);
    console.log('loginHandler ran in Provider');
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('fire-token');
  };

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
