import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://banking-website-fullstack.onrender.com/api/users/login", // Use environment variable
        formData
      );
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful!");
      navigate("/home"); // Replace with your protected route
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "An unexpected error occurred.";
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="w-full px-5 lg:px-0 bg-white py-16">
      <div className="w-full max-w-[570px] p-4 mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-[22px] leading-9 font-bold mb-10">
          Hello!{" "}
          <span className="text-primaryColor" style={{ color: "skyblue" }}>
            Welcome
          </span>{" "}
          Back 🍕
        </h3>

        <form className="py-4 md:py-0" onSubmit={handleSubmit}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full py-3 sm:py-2 bg-skyblue border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor"
              required
              autoComplete="current-email"
            />
          </div>

          <div className="mb-5 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full py-3 sm:py-2 bg-skyblue border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 px-3 py-2 text-sm font-bold text-skyblue focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="mt-7">
            <button
              type="submit"
              style={{ backgroundColor: "skyblue" }}
              className="w-full bg-skyblue text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>

          {message && (
            <div className="mt-5 text-center">
              <p
                className={`text-${
                  message.includes("successful") ? "green" : "red"
                }-500`}
              >
                {message}
              </p>
            </div>
          )}

          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account?
            <Link
              to="/register"
              className="text-primaryColor font-medium ml-1"
              style={{ color: "skyblue" }}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
