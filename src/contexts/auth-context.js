// auth context

import { createContext, useState, useContext } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    userId: "",
    access_token: "",
    role_id: "",
    role_id1: "",
    phone: "",
  });
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const signIn = (userData) => {
    setLoading(true);
    setUser({
      name: userData?.first_name,
      email: userData?.email,
      userId: userData?.user_id,
      access_token: userData?.access_token,
      role_id: userData?.role_id,
      role_id1: userData?.role_id1,
      phone: userData?.phone,
    });
    localStorage.setItem("access_key", JSON.stringify(userData?.access_token));
    localStorage.setItem("role_id", JSON.stringify(userData?.role_id1));
    localStorage.setItem("user_id", JSON.stringify(userData?.userId));
    setLoggedIn(true);
    setLoading(false);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("access_key");
    localStorage.removeItem("role_id1");
    localStorage.removeItem("user_id");
    setLoggedIn(false);
    setLoading(false);
  };

  const value = { user, isLoggedIn, loading, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
