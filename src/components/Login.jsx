import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

//toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

//components
import Spinner from "./spinner";
import Navbar from "./Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState();
  const { login } = useContext(AuthContext);
  const isFormValid = email && password;
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/org/${token}`);
    }
  });

  const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
  }

  
  return (
    <div className="login">
      <Navbar />
      <div className="w-full h-screen bg-custom-bg">
        <div className="">
          <div className="flex justify-center">
            <h1 className="text-5xl mt-8 font-serif text-white">Log In!</h1>
          </div>

          <div className="bg-white flex my-16 mx-auto w-11/12 sm:w-11/12 md:w-1/2 lg:w-2/5 justify-center items-center border-8 rounded-md">
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="mt-8 block text-sm/6 font-bold text-gray-900 font-serif">
                  Email
                </label>
                <input
                  className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
              </div>

              <div className="mb-6">
                <label className="block text-sm/6 text-gray-900 font-bold font-serif">
                  Password
                </label>
                <input
                  className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
              </div>

              <div className="mb-8">
                <button
                  className={`flex  font-serif justify-center items-center w-full h-10 px-6 font-semibold rounded-md border border-slate-200 text-white ${
                    isFormValid ? "bg-green-700" : "bg-custom-bg"
                  }`}
                >
                  {loading && <Spinner color={"white"} width={"w-5"} />} Log In
                </button>
              </div>
              {/* <div className="mb-8 flex justify-center">
                <p className="text-black font-serif">
                  Not Joined Us Yet?<span className="mx-1"></span>
                  <NavLink to="/signup" className="text-white">
                    <button className="rounded-full pl-4 pr-4 pt-2 pb-2 bg-custom-bg font-serif text-lg p-1">
                      Sign Up !
                    </button>
                  </NavLink>
                </p>
              </div> */}
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
