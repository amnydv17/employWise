import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

//component
import Navbar from "./Navbar";

//toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [email, setEmail] = useState(user?.email || "");
  // const [password, setPassword] = useState();
  const navigate = useNavigate();

  

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate(`/edituser`);
  //   }
  // });

  function handleUpdate(e) {
    e.preventDefault();
    axios
      .put(`https://reqres.in/api/users/${user.id}`, {
        firstName,
        lastName,
        email,
      })
      .then((result) => {
        console.log("dshgdsjhf", result);
        
        toast.success(`Updated Successfully`);
        setTimeout(() => {
          const token = localStorage.getItem("token");
          if (token) {
            navigate(`/org/${token}`);
          }
        }, 2000);
      })
      .catch((error) => {
        console.log(error);

        if (error.response) {
          toast.error(
            `${error.response.data.message}. Please use another email id`,
            { autoclose: 5000 }
          );
        } else if (!error.response) {
          toast.error(`${error.message}. Please try again later`, {
            autoclose: 5000,
          });
        }
      });
  }

  const isFormValid = user.first_name && user.last_name && user.email;

  return (
    <div>
      <Navbar />
      <div className="w-full text-white bg-custom-bg h-screen">
        <div className="flex justify-center">
          <h1 className="text-5xl mt-8 font-serif ">Update Your Details</h1>
        </div>

        <div className="bg-white flex my-16 mx-auto w-11/12 sm:w-11/12 md:w-1/2 lg:w-1/2 justify-center border-4 rounded-md">
          <form onSubmit={handleUpdate}>
            <div className="mt-8 mb-4">
              <label className="block text-sm/6 text-gray-900 font-serif font-bold">
                First Name
              </label>
              <input
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                type="name"
                value={firstName}
                placeholder="Enter your First name"
                onChange={(e) => setFirstName(e.target.value)}
                required
              ></input>
            </div>

            <div className="mt-8 mb-4">
              <label className="block text-sm/6 text-gray-900 font-serif font-bold">
                Last Name
              </label>
              <input
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                type="name"
                value={lastName}
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
                required
              ></input>
            </div>

            <div className="mb-4">
              <label className="block text-sm/6 font-serif font-bold text-gray-900">
                Email
              </label>
              <input
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
            </div>

            {/* <div className="mb-4">
              <label className="block text-sm/6 text-gray-900 font-serif font-bold">
                Change Password
              </label>
              <input
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
            </div> */}

            <div className="mb-8">
              <button
                disabled={!isFormValid}
                type="submit"
                className={`block w-full h-10 px-6 font-serif font-bold rounded-md border border-slate-200 text-white ${
                  isFormValid
                    ? "bg-green-700"
                    : "bg-custom-bg cursor-not-allowed"
                }`}
              >
                Update User
              </button>
            </div>

            {/* <div className="mb-8 flex justify-center">
              <p className="text-black font-serif">
                Already have an account?<span className="mx-1"></span>
                <NavLink to="/login">
                <button className="rounded-full pl-4 pr-4 pt-2 pb-2 text-white bg-custom-bg font-serif p-1">
                      Log In!
                    </button>
                </NavLink>
              </p>
            </div> */}
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditUser;
