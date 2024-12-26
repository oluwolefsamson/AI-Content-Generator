import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "../style";
import { discount, heroImg } from "../assets";
import GetStarted from "../components/GetStarted";
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div
        className="flex flex-row justify-between items-center w-full"
        data-aos="fade-right"
      >
        <h1 className="flex-1 font-poppins font-semibold ss:text-[65px] text-[45px] text-white ss:leading-[100.8px] leading-[75px]">
          Choose Your
          <br className="sm:block hidden" />{" "}
          <span className="text-gradient">Tech </span>{" "}
        </h1>
        <div className="ss:flex hidden md:mr-4 mr-0">
          <GetSpecialty />
        </div>
      </div>
      <h1
        className="font-poppins font-semibold ss:text-[65px] text-[45px] text-white ss:leading-[100px] leading-[75px] w-full"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Specialty
      </h1>
      <select
        value={selectedSpecialty}
        onChange={handleSelectChange}
        className={`${styles.paragraph} p-4 bg-gray-700 text-xl text-white rounded outline-none`}
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
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        disabled={!selectedSpecialty}
      >
        Generate
      </button>
    </div>
  );
};

export default ChooseSpecialty;
