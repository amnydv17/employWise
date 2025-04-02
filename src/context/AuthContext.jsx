import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create Context
export const AuthContext = createContext();

// Provide Context
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to log in the user
  const login = (email, password) => {
    axios
      .post("https://reqres.in/api/login", { email, password })
      .then(async (result) => {
        toast.success("Logged In Successfully", { autoClose: 2000 });

        const authToken = result.data.token;
        localStorage.setItem("token", authToken);
        setToken(authToken); // Update token state

        // Fetch user details after setting token
        const userData = await fetchUser(email);
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
        }

        // Redirect after login
        setTimeout(() => {
          navigate(`/org/${authToken}`);
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = error.response
          ? error.response.data.message
          : `${error.message}. Please try again later`;
        toast.error(errorMessage, { autoClose: 5000 });
      });
  };

  // Fetch user details based on email
  const fetchUser = async (email) => {
    try {
      let page = 1;
      let userFound = null;

      while (!userFound) {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        userFound = response.data.data.find((user) => user.email === email);

        if (userFound) {
          localStorage.setItem("userId", userFound.id);
          return userFound;
        }

        if (page >= response.data.total_pages) break;
        page++; // Move to next page
      }
      return null;
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      return null;
    }
  };

  // Function to log out
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
