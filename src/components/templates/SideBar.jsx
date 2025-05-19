import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-100 p-5">
      {/* Sidebar Header */}
      <h1 className="flex items-center gap-2 text-2xl text-white font-mono">
        <i className="text-[#6556CD] ri-tv-fill"></i>
        <span> Movie App</span>
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col text-zinc-400 text-md gap-3 mt-10 mb-2">
        <h2 className="text-white font-semibold text-xl mb-2">New Feeds</h2>

        <Link
          to="/trending"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-1"
        >
          <i class="ri-fire-fill"></i> Trending
        </Link>
        <Link
          to="/popular"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-1"
        >
          <i class="ri-bard-fill"></i> Popular
        </Link>
        <Link
          to="/movie"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-1"
        >
          <i class="ri-film-line"></i> Movies
        </Link>
        <Link
          to="/tvshows"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-1"
        >
          <i class="ri-tv-2-fill"></i> TV Shows
        </Link>
        <Link
          to="/people"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-1"
        >
          <i class="ri-team-line"></i> People
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-100" />

      <nav className="flex flex-col text-zinc-400 text-md gap-3 mt-10">
        <h2 className="text-white font-semibold text-xl mb-2">Insights Cool</h2>

        <Link
          to="/"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-1"
        >
          <i class="ri-phone-fill"></i> Contact Us
        </Link>
        <Link
          to="/"
          className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-1"
        >
          <i class="ri-information-fill"></i> About Us
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
