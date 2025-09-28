import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/notes" element={<RequireAuth>Home page here</RequireAuth>} />
      
    </Routes>
  );
};
export default App;
