import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
//   console.log(data);
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)) ,url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        // backgroundRepeat:"no-repeat"
      }}
      className="w-full h-[50vh] flex flex-col p-[10%] justify-end items-start"
    >
      <h1 className="text-white w-[70%] text-5xl font-bold mb-2">
        {data.name || data.original_title}
      </h1>
      <p className="text-white w-[70%] text-xs">
        {data.overview.slice(0, 200)}{" "}
        <Link to={`${data.media_type}/details/${data.id}`} className="text-blue-300">...more</Link>
      </p>
      <p className="text-white mt-1">
        <i className="text-yellow-500 text- ri-megaphone-fill"></i>
        {data.release_date ? data.release_date : "No Info" }

        <i className="ml-5 text-yellow-500 text- ri-album-fill"></i>
        {data.media_type.toUpperCase()}
      </p>

      <div className="flex w-[50%] mt-4 ">
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-white bg-[#6556cd] p-2 rounded-lg">Watch Trailer</Link>
      </div>
    </div>
  );
};

export default Header;
