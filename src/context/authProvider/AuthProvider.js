import React, {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext({
  isLoggedIn: true,
  setIsLoggedIn: (prevIsLoggedIn) => ({...prevIsLoggedIn, isLoggedIn: !prevIsLoggedIn}),
});



export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const initialIsLoggedIn = token !== null;
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : null);
  console.log('auth provider', isLoggedIn)
  return (
    <AuthContext.Provider value= {{ isLoggedIn, setIsLoggedIn }} >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
