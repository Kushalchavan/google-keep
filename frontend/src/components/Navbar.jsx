import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="fixed top-0 w-screen h-14 border-b-gray-300 shadow-md flex justify-between items-center px-2 sm:px-6 md:px-10 backdrop-blur-sm bg-transparent">
      <div>
        <h2>Logo</h2>
      </div>
      <div className="flex gap-4">
        <button className="">theme</button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-500"
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
