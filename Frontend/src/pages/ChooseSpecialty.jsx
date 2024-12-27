import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "../style";
import { discount, heroImg } from "../assets";
import GetSpecialty from "../components/GetSpecialty";

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

  const handleSelectChange = (event) => {
    setSelectedSpecialty(event.target.value);
  };

  const handleGenerateClick = () => {
    alert(`Generating content for: ${selectedSpecialty}`);
  };

  return (
    <div className="flex flex-col items-start  min-h-screen bg-black text-white p-8 relative">
      <div
        className="flex flex-col sm:flex-row items-start justify-between w-full"
        data-aos="fade-right"
      >
        <div className="flex-1">
          <h1 className="font-poppins font-semibold ss:text-[65px] text-[45px] text-white ss:leading-[100.8px] leading-[75px] relative mt-[10%]">
            Choose Your
            <br className="sm:block hidden" />
            <span className="text-gradient">Tech</span>
            <br />
            Specialty
          </h1>
          {/* Absolutely positioned GetSpecialty component */}
          <div className="absolute top-[37%] left-[17%] ss:right-[10%] sm:right-[5%] ">
            <GetSpecialty />
          </div>
        </div>
        {/* Image opposite the text */}
        <div className="flex-1 mt-4 sm:mt-0 sm:w-1/2">
          {/* Container with larger height for generated content */}
          <div className="flex justify-center items-center h-[400px] bg-gray-800 text-white p-4 rounded-lg shadow-md">
            {selectedSpecialty ? (
              <p className="text-lg font-semibold">
                You have selected:{" "}
                <span className="text-blue-500">{selectedSpecialty}</span>
              </p>
            ) : (
              <p className="text-lg text-gray-400">
                Generated content will appear here.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full my-6">
        <select
          value={selectedSpecialty}
          onChange={handleSelectChange}
          className={`${styles.paragraph} p-4 bg-gray-700 text-xl text-white rounded outline-none mt-4`}
        >
          <option value="" disabled>
            Select a specialty
          </option>
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>

        {selectedSpecialty && (
          <p className={`${styles.paragraph} mt-4`}>
            You have selected: {selectedSpecialty}
          </p>
        )}
        <button
          onClick={handleGenerateClick}
          className="mt-4 p-4 bg-blue-500 text-white rounded w-[400px]"
          disabled={!selectedSpecialty}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default ChooseSpecialty;
