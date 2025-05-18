import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadperson, removeperson } from "../Store/actions/personAction";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loader from "./templates/Loader";
import HorizontalCards from "../components/templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";

const PersonDetails = () => {
  
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const data = useSelector((state) => state.person);
  const { info } = data;
  const [category, setCategory] = useState("movie");
  console.log(category);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncLoadperson(id));

    return () => {
      // cleanup
      dispatch(removeperson());
    };
  }, [id]);
  
  return info ? (
    <div className="px-10 w-full flex flex-col bg-[#1F1E24] h-[200vh] p-10">
      {/* Navigation */}
      <nav className="flex items-center py-5 text-zinc-300 text-2xl h-[10vh]">
        <i
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer mr-2"
        />
      </nav>

      <div className="w-full flex gap-5">
        {/* Left Poster and Details */}
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[45vh] w-auto max-w-[250px] object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt="Movie Poster"
          />
          <hr className="mt-10" />
          <div className="text-xl text-white flex gap-x-1 mt-2">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              className="hover:text-[#6556CD] cursor-pointer mr-2"
            >
              <i className="ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
              className="hover:text-[#6556CD] cursor-pointer mr-2"
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
              className="hover:text-[#6556CD] cursor-pointer mr-2"
            >
              <i className="ri-instagram-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.x.com/${info.externalid.twitter_id}`}
              className="hover:text-[#6556CD] cursor-pointer mr-2"
            >
              <i className="ri-twitter-x-line"></i>
            </a>
          </div>

          {/* Personal Information */}
          <div>
            <h1 className="text-xl text-zinc-400 font-semibold">
              Personal Info
            </h1>

            <h1 className="text-sm font-semibold text-zinc-400">
              Known For
            </h1>
            <h1 className="text-xs text-zinc-400">
              {info.detail.known_for_department}
            </h1>

            <h1 className="text-sm font-semibold text-zinc-400">Gender</h1>
            <h1 className="text-xs text-zinc-400">
              {info.detail.gender == 2 ? "Male" : "Female"}
            </h1>

            <h1 className="text-sm font-semibold text-zinc-400">BirthDay</h1>
            <h1 className="text-xs text-zinc-400">{info.detail.birthday}</h1>

            <h1 className="text-sm font-semibold text-zinc-400">Death</h1>
            <h1 className="text-xs text-zinc-400">
              {info.detail.deathday ? info.detail.deathday : "Alive"}
            </h1>

            <h1 className="text-sm font-semibold text-zinc-400">Birth Place</h1>
            <h1 className="text-xs text-zinc-400">
              {info.detail.place_of_birth}
            </h1>

            <h1 className="text-sm font-semibold text-zinc-400">
              Also Known As
            </h1>
            <h1 className="text-xs text-zinc-400">
              {info.detail.also_known_as.join(", ")}
            </h1>
          </div>
        </div>

        {/* Right Details and Information */}
        <div className="w-[80%]">
          <h1 className="text-5xl text-zinc-400 font-black">
            {info.detail.name}
          </h1>

          <h1 className="text-xl mt-1 font-semibold text-zinc-400 mb-2">
            Biography
          </h1>
          <h1 className="text-xs text-zinc-400">{info.detail.biography}</h1>

          <h1 className="text-xl mt-1 font-semibold text-zinc-400 mb-2">
            Summary
          </h1>
          <HorizontalCards data={info.movieCredits.cast} />

          <div className="w-full flex justify-between m-5">
            <h1 className="text-xl mt-1 font-semibold text-zinc-400 mb-2">
              Acting
            </h1>

            <Dropdown
              options={["tv", "movie"]}
              func={(e) => {
                setCategory(e);
              }}
            />
          </div>

          <div className="w-full h-[50vh] border border-zinc-700 list-disc text-zinc-400 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(225,225,225,.5)] p-4 rounded-lg">
            <ul className="space-y-2">
              {info[category + "Credits"].cast.map((c, i) => (
                <li
                  key={i}
                  className="hover:text-white transition duration-150 cursor-pointer border-b border-zinc-700 pb-2 last:border-none"
                >
                  <Link
                    to={`/${category}/details/${c.id}`}
                    className="flex flex-col gap-1"
                  >
                    <span className="font-medium">
                      {c.name || c.title || c.original_name || c.original_title}
                    </span>
                    {c.character && (
                      <span className="text-sm text-zinc-500 italic">
                        Character : {c.character}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default PersonDetails;
