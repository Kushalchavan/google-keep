const Signup = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-96 p-6 rounded-md shadow-md ring ring-gray-200">
        <h1 className="uppercase text-2xl font-semibold mb-4 text-center tracking-tight">
          Signup
        </h1>

        <form className="flex flex-col gap-4 ">
          <div class="relative">
            <input class="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
            <label class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
              Email
            </label>
          </div>

          <div class="relative">
            <input class="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
            <label class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
              Password
            </label>
          </div>

          <button className="px-3 py-2 rounded-md border cursor-pointer bg-gray-900 hover:bg-gray-700 transition-colors text-white shadow-sm">
            Login
          </button>
        </form>

        <p className="mt-4 text-sm font-semibold text-gray-500">
          Already have an account <span className="font-bold">Login</span>
        </p>
      </div>
    </div>
  );
};
export default Signup;
