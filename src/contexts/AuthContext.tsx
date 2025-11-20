import React, { createContext, useContext } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children, onLogin }) => {
  return <AuthContext.Provider value={{ onLogin }}>{children}</AuthContext.Provider>;
};
