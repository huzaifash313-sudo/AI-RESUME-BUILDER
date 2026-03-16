import React from "react";

const Banner = () => {
  return (
    <div className="w-full border-b border-green-100">
      <div className="w-full py-3 font-semibold text-sm text-green-900 text-center bg-gradient-to-r from-[#ABFF7E] via-[#d4ffba] to-[#ABFF7E]">
        <p className="flex items-center justify-center gap-2">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider text-white bg-green-600 animate-pulse">
            New
          </span>
          <span className="tracking-tight">
            AI Resume Enhancement Features are now Live
          </span>
        </p>
      </div>
    </div>
  );
};

export default Banner;