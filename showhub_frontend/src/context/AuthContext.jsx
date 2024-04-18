// AuthContext.js
import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const login = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    console.log("User logged in");
    console.log("User email:", email);
  };

  const logout = () => {
    setUserEmail("");
    setIsLoggedIn(false);
    // Remove JWT token from cookie
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
