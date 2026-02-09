import { ReactNode, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const checkIfIsAuth = async () => {
      if (!document.cookie.includes("accessToken")) {
        setLogged(false);
        return false;
      }

      try {
        const response = await fetch("https://localhost:3001/authCheck", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          setLogged(false);
          return false;
        }

        setLogged(response.ok);
      } catch (err) {
        setLogged(false);
      }
    };

    checkIfIsAuth(); // Verificação inicial

    const intervalId = setInterval(() => {
      checkIfIsAuth();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ logged }}>{children}</AuthContext.Provider>
  );
};
