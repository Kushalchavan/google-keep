import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/notes";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(firstname, lastname, email, password);
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-96 p-6 rounded-md shadow-md ring ring-gray-200">
        <h1 className="uppercase text-2xl font-semibold mb-4 text-center tracking-tight text-gray-500">
          Signup
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <div className="relative">
            <input
              className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              value={firstname}
              type="text"
              placeholder="Firstname"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className="relative">
            <input
              class="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              value={lastname}
              type="text"
              placeholder="Lastname"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div className="relative">
            <input
              className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              value={email}
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <input
              className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <button className="px-3 py-2 rounded-md border cursor-pointer bg-gray-900 hover:bg-gray-700 transition-colors text-white shadow-sm">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm font-semibold text-gray-400">
          Already have an account{" "}
          <Link className="font-bold text-gray-600" to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Signup;
