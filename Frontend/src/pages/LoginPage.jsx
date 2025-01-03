import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../src/redux/userRelated/authSlice";
import loginVid from "../assets/loginVid.mp4";
import LoginText from "../components/LoginText";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // If the user is already logged in (i.e., user exists in Redux state), navigate to another page
    if (user) {
      // Redirect to the "specialty" page with userId appended to the URL
      navigate(`/specialty/${user.userId}`);
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleShowPasswordChange = (e) => {
    setShowPassword(e.target.checked);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      if (result.type === "auth/loginUser/fulfilled") {
        // After successful login, you can use the userId here
        const userId = result.payload.user.userId; // Get userId from the response
        console.log("Logged in User ID:", userId); // Optionally log it or use it for any other logic

        // Navigate to the specialty page after login with userId in URL
        navigate(`/specialty/${userId}`);
      }
    });
  };

  return (
    <section className="flex items-center px-5 lg:px-0 min-h-screen relative bg-white">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 h-full w-full object-cover lg:opacity-70 sm:opacity-70"
      >
        <source src={loginVid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Left text */}
      <div className="hidden md:block bg-primaryColor rounded-l-lg">
        <LoginText />
      </div>

      {/* Login Form */}
      <div className="md:mr-11 w-full py-6 px-6 max-w-[570px] bg-white mx-auto rounded-lg shadow-2xl md:p-10 z-10">
        <h3 className="font-poppins font-bold ss:text-[25px] text-[22px] leading-9 mb-10">
          Hello User! <span className="text-blue-500">Welcome Back</span>
        </h3>

        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="w-full px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-5">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="w-full px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
              required
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center mb-5">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={handleShowPasswordChange}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-textColor">
              Show Password
            </label>
          </div>

          {error && <p className="text-red-500 text-center mb-3">{error}</p>}

          <div className="mt-7">
            <button
              type="submit"
              className="cusor:pointer w-full bg-blue-600 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              disabled={isLoading}
            >
              {isLoading ? <DotLoader size={25} color="white" /> : "Login"}
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account?
            <Link to="/register" className="text-blue-600 font-bold ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
