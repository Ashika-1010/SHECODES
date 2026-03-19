import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(false);

  function login(user, pass) {
    if ((user === 'admin' || user.includes('@')) && pass === 'uniontrace') {
      setIsAuthed(true);
      return true;
    }
    return false;
  }

  function logout() {
    setIsAuthed(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
