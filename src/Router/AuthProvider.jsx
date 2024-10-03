import React, { useEffect, useState, createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuth = async () => {
      const token = localStorage.getItem("accessToken");
      console.log("Token from localStorage:", token);

      if (token) {
        try {
          const response = await fetch("http://localhost:8000/api/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userData = await response.json();
          console.log("User data from API:", userData);

          if (response.ok) {
            setUser(userData);
            setIsLoading(false);

            if (userData.role === "Admin") {
              console.log("Navigating to Admin Dashboard");
              navigate("/MainAdmin");
            } else if (userData.role === "Customer") {
              console.log("Navigating to Customer Home");
              navigate("/");
            } else {
              console.log("Unknown role, redirecting to login");
              navigate("/Login");
            }
          } else {
            console.error(
              "Failed to fetch user data, status:",
              response.status
            );
            setIsLoading(false);
            navigate("/Login");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigate("/Login");
        }
      } else {
        console.log("No token found, redirecting to login.");
        setIsLoading(false);
        navigate("/Login");
      }
    };

    checkUserAuth();
  }, [navigate]);

  const login = (userData) => {
    console.log("Login successful, token:", userData.token);
    setUser(userData);
    localStorage.setItem("accessToken", userData.token);
  };

  const logout = () => {
    console.log("Logout function triggered");
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
