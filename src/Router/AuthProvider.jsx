import React, { useEffect, useState, createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuth = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await fetch(
            "https://cnpmnc-server.vercel.app/api/user",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsLoading(false);
            if (userData.role === "Admin") {
              navigate("/MainAdmin");
            } else if (userData.role === "Customer") {
              navigate("/");
            }
          } else {
            console.error("Failed to fetch user data:", response.status);
            setIsLoading(false);
            navigate("/Login");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigate("/Login");
        }
      } else {
        navigate("/Login");
      }

      setIsLoading(false);
    };

    checkUserAuth();

    return () => {};
  }, [navigate]);

  const value = useMemo(() => ({ user }), [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
