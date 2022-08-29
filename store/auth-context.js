import React, {createContext, useState} from 'react';

export const AuthContext = createContext({
  token: '',
  mfaToken: '',
  obbToken: '',
  isAuthenticated: false,
  authenticate: token => {},
  authenticateMFAToken: token => {},
  authenticateOBBToken: token => {},
  logout: () => {},
});

function AuthContextProvider({children}) {
  const [authToken, setAuthToken] = useState();
  const [mfaToken, setMFAToken] = useState();
  const [obbToken, setOBBToken] = useState();

  function authenticate(token) {
    setAuthToken(token);
  }
  function authenticateMFAToken(token) {
    setMFAToken(token);
  }
  function authenticateOBBToken(token) {
    setOBBToken(token);
  }
  function logout() {
    setAuthToken(null);
    setMFAToken(null);
  }

  const value = {
    token: authToken,
    mfaToken: mfaToken,
    obbToken: obbToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    authenticateMFAToken: authenticateMFAToken,
    authenticateOBBToken: authenticateOBBToken,
    logout: logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
