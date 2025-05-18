import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import noimage from '../../assets/noimage.jpg'

const HorizontalCards = ({ data  ,setCategory}) => {
  // console.log(data); // Optional: Log data to the console for debugging

  return (

      <div className="w-[100%] flex h-[55vh] overflow-x-auto overflow-y-hidden">
        {data.map((d, i) => (
          <Link to={`/${d.media_type}/details/${d.id}`} key={i} className="min-w-[20%] h-[95%] mr-3  bg-zinc-900  rounded-sm" >
            <img
              className="w-full h-[55%] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                d.backdrop_path || d.poster_path
              }` || noimage } 
              alt=""
            />
            <h1 className="text-xl font-bold text-white text-center">
              {d.title || d.original_name || d.original_title}
            </h1>
            <p className="mt-3 mb-3 text-white text-[0.6rem] font-light text-center ">
              {d.overview?.slice(0, 60)}...
              <span className="text-blue-400"> more</span>
            </p>
          </Link>
        ))}
      </div>

  );
};

export default HorizontalCards;
