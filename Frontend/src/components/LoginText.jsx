import React from "react";

const LoginText = () => {
  const splitText = (text, animate = true) => {
    return text.split("").map((char, index) => (
      <span key={index} className={animate ? "moving-letter" : ""}>
        {char}
      </span>
    ));
  };

  return (
    <div className="lg:ml-[100px] md:ml-4 relative z-10  flex">
      <div className="text-white font-poppins font-extrabold lg:text-[120px] md:text-[80px] text-[45px]">
        {splitText("Tech")} {/* Apply animation to Tech */}
      </div>
      <div className="text-gradient font-poppins font-bold lg:text-[85px] md:text-[70px] text-[30px] lg:mt-11 md:mt-4 ">
        {splitText("Tales", false)} {/* No animation for Tales */}
      </div>
    </div>
  );
};

export default LoginText;
