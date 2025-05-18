import React from "react";
import gif from '../../assets/loader.gif'

const Loader = () => {
  return (
    <div className="h-full w-full bg-transparent flex justify-center items-center">
      <img className="w-28" src={gif} alt="Random GIF" />
    </div>
  );
};

export default Loader;
