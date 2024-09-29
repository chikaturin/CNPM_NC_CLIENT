import React, { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuth = () => {
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);

        if (decodedToken.role === "Admin") {
          navigate("/admin");
        } else if (decodedToken.role === "Customer") {
          navigate("/customer");
        }
      } else {
        navigate("/login");
      }

      setIsLoading(false);
    };

    checkUserAuth();

    return () => {};
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
