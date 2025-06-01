import React from "react";

export type AuthContextType = {
  logged: boolean;
};

const AuthContext = React.createContext<AuthContextType | null>(null);

export default AuthContext;
