import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  function handleLoginbtnClick() {
    navigate("/login");
  }

  function handleUserList() {
    navigate(`/org/${token}`);
  }
  return (
    <div className="h-screen to-fuchsia-500">
      <Navbar />
      <div className="flex flex-col md:flex-row justify-between p-6 md:p-16 bg-gradient-to-bl from-violet-500 to-fuchsia-500">
        
        
        <div className="flex w-11/12 md:w-3/4 justify-center items-center">
          <img
            src="https://employwise.com/wp-content/uploads/2024/07/Banner.webp"
            className="w-3/4"
          ></img>
        </div>
        
        
        <div className="flex flex-col w-11/12 md:w-1/2">
          {/* <p className="text-gray-400 font-semibold">About Us</p> */}
          <h1 className="leading-[40px] my-4 lg:my-0 xl:leading-loose text-4xl text-white font-bold text-center font-serif">
            Welcome to EmployWise
          </h1>
          <p className="leading-relaxed text-white font-sans">
            We are the company behind EmployWise, award-winning cloud-based
            software for hire-to-retire HR automation delivered in the SaaS
            model. Through our products and services, we help our customers
            leverage their human capital to achieve better business results. We
            believe in nurturing talent because we believe that to build a
            successful organization, we need people with exemplary talent! We
            provide our people with an environment charged with challenges,
            achievements, and aspirations. Each team member strives to maintain
            the highest standards of integrity and ethical business practices
            along with individual determination for quality, learning, and
            growth, which helps us exceed expectations.
          </p>

          {token ? (
            <div className="mt-4 items-center">
              <button
                onClick={handleUserList} // Log out when token exists
                className="w-1/3 h-10 font-bold font-serif rounded-md border border-slate-200 text-white bg-custom-bg ml-24 lg:ml-0"
              >
                Users List
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <button
                onClick={handleLoginbtnClick} // Log in when token is absent
                className="w-1/3 h-10 font-bold font-serif rounded-md border border-slate-200 text-white bg-custom-bg items-center"
              >
                Log In
              </button>
            </div>
          )}
        </div>



      </div>
    </div>
  );
};

export default Homepage;
