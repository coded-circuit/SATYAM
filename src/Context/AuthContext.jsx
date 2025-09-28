// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");

  // Demo users. Replace with API calls in production.
  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "officer", password: "field123", role: "officer" },
    { username: "frd01", password: "frd123", role: "frd" },
    { username: "pda01", password: "pda123", role: "pda" },
    { username: "ngo01", password: "ngo123", role: "ngo" },
  ];

  const login = (username, password) => {
    setAuthError("");
    const matched = users.find(
      (u) => u.username === username && u.password === password
    );

    if (matched) {
      const { password: _omit, ...safeUser } = matched;
      setUser(safeUser);
      return true;
    }

    setUser(null);
    setAuthError("Invalid username or password");
    return false;
  };

  const logout = () => {
    setUser(null);
    setAuthError("");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authError, users }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
