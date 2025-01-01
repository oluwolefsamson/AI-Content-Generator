import React from "react";
import { Link } from "react-router-dom";
import regVid from "../assets/regVid.mp4";

const Signup = () => {
  return (
    <section className="flex justify-center items-center min-h-screen px-5 xl:px-0 bg-white">
      <div className="max-w-[1170px] px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
          {/* Video Section */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <video
              autoPlay
              loop
              muted
              className="h-[100vh] w-full object-cover"
            >
              <source src={regVid} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Form Section */}
          <div className="rounded-lg lg:pl-16 py-10 w-full h-full flex justify-center items-center">
            <div className="w-full max-w-[570px]">
              <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                Create an <span className="text-blue-500">account</span>
              </h3>

              <form>
                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="Enter Your Full Name"
                    className="w-full px-2 py-3 border-b border-solid border-[#0026ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full px-2 py-3 border-b border-solid border-[#0026ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="tel"
                    placeholder="Enter Your Phone Number"
                    className="w-full px-2 py-3 border-b border-solid border-[#0026ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                    required
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    className="w-full px-2 py-3 border-b border-solid border-[#0026ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor cursor-pointer"
                    required
                  />
                </div>

                <div className="mb-5">
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white text-[16px] leading-7 rounded-lg"
                  >
                    Create Account
                  </button>
                </div>
              </form>

              <div className="mt-8">
                <p className="text-[15px] leading-7 text-headingColor sm:text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 font-bold">
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
