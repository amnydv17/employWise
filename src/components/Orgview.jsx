import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//components
import Navbar from "./Navbar";
import Spinner from "./spinner";
import Pagination from "./Pagination";

const Orgview = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const userId = Number(localStorage.getItem("userId"));
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState(1); // Initialize currentPage to 1

  const [usersPerPage, setUsersPerPage] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch users when the component mounts
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://reqres.in/api/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add your Bearer token here
          },
        });
        if (response.request.status === 200) {
          setUsers(response.data.data);
          setTotal(response.data.total);
          setCurrentPage(1); // Reset currentPage to 1 after fetching all users
          setUsersPerPage(response.data.per_page); // This can be adjusted as needed
        }
        setLoading(false);
      } catch (error) {
        setError("Error fetching users");
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, [currentPage]); // Empty dependency array to run only once when the component mounts

  return (
    <div>
      <Navbar />
      <div className="bg-custom-bg py-7">
        <h1 className="text-6xl font-bold text-center pb-7 text-white">
          Hello Users !
        </h1>
        <div className="mt-2">
          <div className="flex justify-end mb-4 mr-20">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded p-2"
            />
          </div>
          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-3 mx-20">
          {users
            .filter((user) =>
              `${user.first_name} ${user.last_name} ${user.email}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((user, index) => (

                <div
                  key={user.id}
                  className="flex flex-row h-36 justify-around items-center border-2 rounded-lg border-indigo-600 bg-white transform transition-transform hover:scale-105"
                >
                  <div className="flex items-center border-4 border-indigo-600 overflow-hidden rounded-full">
                    <img src={user.avatar} alt={user.first_name} width="100" />
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="pr-2">
                      <h3 className="text-xl font-semibold">
                        {user.first_name} {user.last_name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2 font-bold">
                        Email: {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <Pagination
            totalPosts={total}
            postsPerPage={usersPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Orgview;
