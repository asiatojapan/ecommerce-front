import React, { useEffect, useState } from 'react';
export const RootContext = React.createContext();

export default ({ children }) => {
  const prevAuth = window.localStorage.getItem('auth') || false;
  const prevAuthBody = window.localStorage.getItem('authBody') || null;
  const prevTest = window.localStorage.getItem('authTest') || false;
  const [authenticated, setAuthenticated] = useState(prevAuth);
  const [test, setTest] = useState(prevTest)
  const [authBody, setAuthBody] = useState(prevAuthBody);

  useEffect(
    () => {
      window.localStorage.setItem('authenticated', authenticated);
      window.localStorage.setItem('authBody', authBody);
    },
    [authenticated, authBody]
  );

  const defaultContext = {
    authenticated,
    setAuthenticated,
    authBody,
    setAuthBody,
    test,
    setTest
  };

  return (
    <RootContext.Provider value={defaultContext}>
      {children}
    </RootContext.Provider>
  );
};