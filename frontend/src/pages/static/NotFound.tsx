import '../../styles/pages/static/NotFound.css';
import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="h-screen w-full bg-[#121428] overflow-hidden flex items-center justify-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center relative">
        {/* "404" Section */}
        <div className="four0four text-white text-[15rem] md:text-right md:w-[450px] md:mr-8 relative z-10">
          <span className="off text-gray-600">4</span>
          <span className="flicker2 text-white">0</span>
          <span className="flicker3 text-gray-600">4</span>
        </div>

        {/* "Page Not Found" Section */}
        <div className="not-found text-white text-5xl font-light leading-none">
          <div>
            <span className="flicker4 text-purple-500">P</span>
            <span className="off text-gray-600">a</span>
            <span>g</span>
            <span>e</span>
        </div>
        <div>
            <span className="off text-purple-500">n</span>
            <span className="flicker1 text-white">o</span>
            <span className="flicker3 text-white">t</span>
        </div>
        <div>
            <span className="flicker4 text-purple-500">f</span>
            <span>o</span>
            <span className="off text-gray-600">u</span>
            <span>n</span>
            <span className="off text-purple-500">d</span>
          </div>
        </div>

        {/* Fog Elements */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`fog fog${i + 1} absolute bg-white rounded-full`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default NotFound;
