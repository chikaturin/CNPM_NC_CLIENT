import React, { useEffect, useState, createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const URL = "https://cnpm-ncserver.vercel.app/api";

  useEffect(() => {
    const checkUserAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const response = await fetch(
            "https://cnpm-ncserver.vercel.app/api/user",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const userData = await response.json();

          if (response.ok) {
            setUser(userData);
            setIsLoading(false);

            if (userData.role === "Admin") {
              navigate(window.location.pathname);
            } else if (userData.role === "Customer") {
              navigate(window.location.pathname);
            } else {
              navigate("/Login");
            }
          } else {
            setIsLoading(false);
            navigate("/Login");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigate("/Login");
        }
      } else {
        setIsLoading(false);
        navigate("/Login");
      }
    };

    checkUserAuth();
  }, [navigate]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("accessToken", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    navigate("/Login");
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
