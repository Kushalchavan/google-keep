import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const { logout } = useAuth();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme", "dark");
    }
  }, [dark]);

  return (
    <nav className="fixed top-0 w-screen h-14 border-b-gray-300 shadow-md flex justify-between items-center px-2 sm:px-6 md:px-10 backdrop-blur-sm bg-transparent dark:bg-gray-800 dark:text-white">
      <div>
        <h2 className="text-xl uppercase font-semibold">Notify</h2>
      </div>
      <div className="flex gap-6">
        <button className="cursor-pointer" onClick={() => setDark(!dark)}>
          {dark ? <Sun /> : <Moon />}
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-500 cursor-pointer"
          onClick={() => {
            logout();
            window.location = "/";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
