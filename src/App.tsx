import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
<<<<<<< HEAD
import { AuthProvider } from "./context/AuthProvider";
=======
>>>>>>> c31e0de1390ac30764829db2cd82d048839763b7

export default function App() {
  return (
    <div>
<<<<<<< HEAD
      <AuthProvider>
        <Navbar />
        <Outlet />
      </AuthProvider>
    </div>
  );
}
=======
      <Navbar />

      <Outlet />
    </div>
  )
}
>>>>>>> c31e0de1390ac30764829db2cd82d048839763b7
