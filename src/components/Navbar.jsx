/* eslint-disable react/prop-types */
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const { logout, user } = useContext(AuthContext);

  const location = useLocation();
  const isEditPage = location.pathname.includes("/edituser");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 808);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleLogOut() {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  }

  function handleEdit() {
    navigate("/edituser");
    setIsMenuOpen(false);
  }

  const handleDeleteProfile = async () => {
    if (!user || !user.id) {
      toast.error("User not found!");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `https://reqres.in/api/users/${user.id}`
      );

      if (response.status === 204) {
        toast.success("User deleted successfully!");
        setTimeout(() => {
          logout();
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  return (
    <nav className=" flex items-center justify-around p-4 font-bold ">
      {/* Logo */}
      <div className="pl-4 sm:pl-10 flex justify-start sm:justify-start 2xl:mr-96">
        <a href="/" className="flex">
          <img
            src="https://employwise.com/wp-content/uploads/2023/12/Logo.svg"
            alt="Logo"
            className="h-8 sm:h-10 max-w-xs"
          />
        </a>
      </div>

      {/* Desktop Navbar */}
      {!isMobile && (
        <div className="flex flex-row items-center justify-around space-x-4 2xl:ml-96">
          {user && Number(userId) === user.id && (
            <>
              {!isEditPage && (
                <button
                  className="bg-black text-white border-2 rounded-lg border-indigo-600 px-4 py-2 hover:bg-blue-600 font-serif transition duration-300 ease-in-out"
                  onClick={handleEdit}
                >
                  Edit Profile
                </button>
              )}
              <button
                className="bg-black text-white border-2 rounded-lg border-indigo-600 px-4 py-2 hover:bg-blue-600 font-serif transition duration-300 ease-in-out"
                onClick={handleDeleteProfile}
              >
                Delete Profile
              </button>
            </>
          )}
          {token && (
            <button
              onClick={handleLogOut}
              className="rounded-full px-4 py-2 text-white border-2 border-indigo-600 bg-custom-bg hover:bg-indigo-700 font-serif text-lg"
            >
              Log Out
            </button>
          )}
        </div>
      )}

      {/* Mobile Hamburger Menu (Only below 720px width) */}
      {isMobile && (
        <div id="menu-container" className="relative">
          <Bars3Icon
            className="w-8 h-8 cursor-pointer bg-custom-bg text-white ml-28"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-10 left-3/4 transform -translate-x-3/4 bg-gray-900 text-white flex flex-col items-center w-36 rounded-lg shadow-lg border border-gray-700">
              {!isEditPage && (
                <button
                  className="w-full px-4 py-2 text-center border-separate hover:bg-gray-800"
                  onClick={handleEdit}
                >
                  Edit Profile
                </button>
              )}
              <button
                className="w-full px-4 py-2 text-center hover:bg-gray-800"
                onClick={handleDeleteProfile}
              >
                Delete Profile
              </button>
              <button
                className="w-full px-4 py-2 text-center hover:bg-gray-800"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}

      <ToastContainer />
    </nav>
  );
};

export default Navbar;
