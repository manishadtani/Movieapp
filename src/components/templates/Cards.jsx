import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../assets/noimage.jpg";

const Cards = ({ data , title}) => {
  console.log(title);
  
  return (
    <div className="flex flex-wrap justify-center gap-6 w-full bg-[#1F1E24] relative">
      {data.map((c, i) => (
        <Link
          to={`/${data.media_type || title}/details/${c.id}`}
          className="w-[20vw] max-w-[250px] mb-[3%]"
          key={i}
        >
          <div className="relative">
            <img
              className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] w-full object-cover rounded-lg"
              src={
                c.poster_path
                  ? `https://image.tmdb.org/t/p/original/${c.poster_path}`
                  : c.backdrop_path
                  ? `https://image.tmdb.org/t/p/original/${c.backdrop_path}`
                  : c.profile_path
                  ? `https://image.tmdb.org/t/p/original/${c.profile_path}`
                  : noimage
              }
              alt={
                c.name ||
                c.title ||
                c.original_name ||
                c.original_title ||
                "No Image"
              }
            />
              {c.vote_average &&
                            <div className="absolute top-[65%] -right-3 bg-yellow-600 text-white w-[8vh] h-[8vh] rounded-full flex items-center justify-center text-xl font-semibold">
                            {(c.vote_average * 10).toFixed()}
                            <sup>%</sup>
                          </div>
              }

          </div>
          <h1 className="text-xl text-zinc-300 mt-3 font-semibold text-center">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
