import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./context/AuthProvider";

export default function App() {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Outlet />
      </AuthProvider>
    </div>
  );
}
