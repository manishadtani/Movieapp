import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadmovie, removemovie } from "../Store/actions/movieActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "./templates/Loader";
import HorizontalCards from "../components/templates/HorizontalCards";

const Moviedetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const data = useSelector((state) => state.movie);
  const { info } = data;

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncLoadmovie(id));

    return () => {
      // cleanup
      dispatch(removemovie());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)) ,url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="w-full h-[160vh] bg-[#1F1E24] px-[5%] relative"
    >
      {/* navigation bar */}
      <nav className="flex items-center py-5 text-zinc-300 text-2xl">
        <i
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer mr-2 "
        />
        <a
          target="_blank"
          href={info.detail.homepage}
          className="hover:text-[#6556CD]  cursor-pointer mr-2 "
        >
          <i class="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          className="hover:text-[#6556CD]  cursor-pointer mr-2 "
        >
          <i class="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          className="hover:text-[#6556CD]  cursor-pointer mr-2 "
        >
          IMDB
        </a>
      </nav>

      {/* poster and details */}
      <div className="w-full flex ">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[55vh] w-auto max-w-[250px] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt="Movie Poster"
        />

        <div className="w-[70%] ml-10  ">
          <h1 className="text-5xl text-zinc-300 w-[100%]  font-bold   text-left ml-3 ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-xl text-zinc-400 ml-3">
              {info.detail.release_date &&
                `(${info.detail.release_date.split("-")[0]})`}
            </small>
          </h1>

          <div className="flex text-zinc-100 items-center gap-5 p-1">
            {info.detail.vote_average && (
              <div className=" bg-yellow-600 text-white w-[6vh] h-[6vh] rounded-full flex items-center justify-center text-xl font-semibold">
                {(info.detail.vote_average * 10).toFixed()}
                <sup>%</sup>
              </div>
            )}

            <h1>Rating : </h1>
            <h1>
              {info.detail.release_date && `(${info.detail.release_date})`}
            </h1>
            <h1>
              {info.detail.genres &&
                info.detail.genres.map((c, i) => c.name).join(",")}
            </h1>
            <h1>
              {Math.floor(info.detail.runtime / 60)}hr
              {info.detail.runtime % 60}min
            </h1>
          </div>

          <h1 className="text-lg font-semibold italic text-zinc-200 ml-2">
            {info.detail.tagline}
          </h1>

          <h1 className="text-2xl font-sans font-semibold text-zinc-200 mt-3 ml-2 ">
            Overview :{" "}
          </h1>

          <p className="text-xs text-zinc-200 ml-2 w-full p-1 ">
            {info.detail.overview}
          </p>

          <h1 className="text-2xl font-sans font-semibold text-zinc-200 mt-3 ml-2 ">
            Translated to :{" "}
          </h1>

          <p className="text-xs text-zinc-200 ml-2  p-1  w-full h-10 ">
            {info.translations.join(",  ")}
          </p>

          <Link
            to={`${pathname}/trailer`}
            className="text-white bg-[#6556CD] hover:bg-[#5246A3] transition-colors duration-200 px-2 py-1 rounded-sm text-lg font-semibold ml-2 inline-block mt-5"
          >
            <i class="ri-play-fill"></i> Play Trailer
          </Link>
        </div>
      </div>

      {/* Available on platforms */}

      <div className="w-[90%] flex flex-col ">
        {info.watchproviders &&
          info.watchproviders.flatrate &&
          info.watchproviders.flatrate.length > 0 && (
            <div className="w-[70%]">
              <div className="flex  items-center text-white">
                <h1 className="text-sm font-semibold">Available on Platform</h1>
                {info.watchproviders &&
                  info.watchproviders.flatrate &&
                  info.watchproviders.flatrate.length > 0 &&
                  info.watchproviders.flatrate.map((c, i) => {
                    return (
                      <img
                        title={c.provider_name}
                        src={`https://image.tmdb.org/t/p/original/${c.logo_path}`}
                        className="w-7 h-7 m-2 rounded-lg hover:scale-110 transform transition duration-300 ease-in-out"
                        alt=""
                      />
                    );
                  })}
              </div>
            </div>
          )}

        {info.watchproviders &&
          info.watchproviders.rent &&
          info.watchproviders.rent.length > 0 && (
            <div className="w-[70%]">
              <div className="flex  items-center text-white">
                <h1 className="text-sm font-semibold">Available on Rent</h1>
                {info.watchproviders &&
                  info.watchproviders.rent &&
                  info.watchproviders.rent.length > 0 &&
                  info.watchproviders.rent.map((c, i) => {
                    return (
                      <img
                        title={c.provider_name}
                        src={`https://image.tmdb.org/t/p/original/${c.logo_path}`}
                        className="w-7 h-7 m-2 rounded-lg hover:scale-110 transform transition duration-300 ease-in-out"
                        alt=""
                      />
                    );
                  })}
              </div>
            </div>
          )}

        {info.watchproviders &&
          info.watchproviders.buy &&
          info.watchproviders.buy.length > 0 && (
            <div className="w-[70%]">
              <div className="flex  items-center text-white">
                <h1 className="text-sm font-semibold">
                  Available for Purchase
                </h1>
                {info.watchproviders &&
                  info.watchproviders.buy &&
                  info.watchproviders.buy.length > 0 &&
                  info.watchproviders.buy.map((c, i) => {
                    return (
                      <img
                        title={c.provider_name}
                        src={`https://image.tmdb.org/t/p/original/${c.logo_path}`}
                        className="w-7 h-7 m-2 rounded-lg hover:scale-110 transform transition duration-300 ease-in-out"
                        alt=""
                      />
                    );
                  })}
              </div>
            </div>
          )}
      </div>

       <hr className="mt-10" />   
      {/* Recommendations and similar stuff */}
      <div className="mt-5">
        <h1 className="text-white text-2xl mb-3">Recommended Contents</h1>
        <HorizontalCards
          data={info.recommendations || info.similar}
          title="Recommendations"
        />
      </div>

      <Outlet/>
    </div>
  ) : (
    <Loader />
  );
};

export default Moviedetails;
