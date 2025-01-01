import React, { useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "../style";
import { discount, heroImg } from "../assets";
import GetSpecialty from "../components/GetSpecialty";
import { FiClipboard, FiShare2 } from "react-icons/fi"; // Importing icons from react-icons
import { BounceLoader } from "react-spinners";
import { BeatLoader } from "react-spinners";
const specialties = [
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "Data Science",
  "Machine Learning",
  "DevOps",
  "Cybersecurity",
  "UI/UX Design",
  "Graphics Design",
];

const ChooseSpecialty = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSelectChange = (event) => {
    setSelectedSpecialty(event.target.value);
    setGeneratedContent("");
    setError("");
  };

  const handleGenerateClick = async () => {
    if (!selectedSpecialty) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/content/generate",
        {
          specialty: selectedSpecialty,
        }
      );

      if (response.data.success) {
        setGeneratedContent(response.data.data);
      } else {
        setError("Failed to fetch content. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while fetching content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    alert("Content copied to clipboard!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Generated Content",
        text: generatedContent,
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white p-4 sm:p-8 relative my-[80px] mx-10">
      {/* Header Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {/* Left Section */}

        <div className="flex flex-col items-start md">
          <div className="flex flex-row items-center py-2 px-4 bg-discount-gradient rounded-[10px] mb-2">
            <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
            <p className={`${styles.paragraph} ml-2`}>
              <span className="text-white">10%</span> Discount For{" "}
              <span className="text-white">1 Month</span> Account
            </p>
          </div>
          <h1 className="font-poppins font-semibold text-[35px] sm:text-[45px] lg:text-[65px] text-white leading-[1.2]  sm:mt-[10%]">
            <span>Choose Your</span>
            <p className="text-gradient my-8">Tech</p>
            <span>Specialty</span>
          </h1>
          {/* GetSpecialty - Hidden on Mobile */}
          <div className="hidden sm:block absolute top-[20%] left-[38%]">
            <GetSpecialty />
          </div>
        </div>

        {/* Right Section: Generated Content */}
        <div className="relative flex items-center justify-center bg-gray-800 text-white p-4 rounded-lg shadow-md">
          {/* Icons positioned at the top-left corner */}
          {generatedContent && (
            <div className="absolute top-2 left-2 flex space-x-2">
              <button
                onClick={handleCopy}
                className="text-white p-1 rounded hover:bg-gray-700"
              >
                <FiClipboard className="h-6 w-6" />
              </button>
              <button
                onClick={handleShare}
                className="text-white p-1 rounded hover:bg-gray-700"
              >
                <FiShare2 className="h-6 w-6" />
              </button>
            </div>
          )}

          {/* Conditional rendering of content */}
          {loading ? (
            <p className="text-lg font-semibold text-blue-500">
              <BounceLoader color="#fff" />
            </p>
          ) : generatedContent ? (
            <p
              className={`${styles.paragraph} text-lg font-semibold whitespace-pre-wrap overflow-auto`}
              style={{
                minHeight: "150px", // You can adjust this value as needed
                maxHeight: "500px", // Maximum height before scrolling starts
              }}
            >
              {generatedContent}
            </p>
          ) : error ? (
            <p className="text-lg font-semibold text-red-500">{error}</p>
          ) : (
            <p className="text-lg text-gray-400 text-center">
              Generated content will appear here.
            </p>
          )}
        </div>
      </div>

      {/* Dropdown and Generate Button */}
      <div className="flex flex-col items-center justify-center w-full mt-[80px]">
        {/* Dropdown */}
        <select
          value={selectedSpecialty}
          onChange={handleSelectChange}
          className="w-full sm:w-[400px] p-4 bg-gray-800 text-lg text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        >
          <option value="" disabled>
            Select a specialty
          </option>
          {specialties.map((specialty) => (
            <option
              key={specialty}
              value={specialty}
              className="hover:bg-blue-700"
            >
              {specialty}
            </option>
          ))}
        </select>

        {/* Selected Specialty */}
        {selectedSpecialty && (
          <p className="mt-4 text-lg text-white">
            You have selected:{" "}
            <span className="font-semibold text-blue-500">
              {selectedSpecialty}
            </span>
          </p>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerateClick}
          className="cursor-pointer mt-6 p-4 bg-blue-600 text-white text-xl font-poppins font-semibold rounded-lg w-full sm:w-[400px] hover:bg-blue-700 transition duration-200"
          disabled={!selectedSpecialty || loading}
        >
          {loading ? <BeatLoader color="#fff" /> : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default ChooseSpecialty;
