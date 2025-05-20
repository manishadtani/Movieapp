import axios from "../utils/Axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./templates/Loader";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const TvShows = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tvshows, setTvshows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "StarStream " + "| " + "TvShows";

  console.log(tvshows);

  const getTvshows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        setTvshows((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("ERROR:", error);
      setHasMore(false); // Stop infinite scrolling on error
    }
  };

  const refreshHandeler = () => {
    if (tvshows.length == 0) {
      getTvshows();
    } else {
      setPage(1);
      setTvshows([]);
      getTvshows();
    }
  };

  useEffect(() => {
    refreshHandeler();
  }, [category]);

  return tvshows.length ? (
    <div className=" py-3 w-screen h-screen ">
      {/* Header */}
      <div className="w-full flex items-center mb-4 px-5">
        <h1 className="text-2xl w-[20%] font-semibold text-zinc-400 flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer mr-2 "
          />
          TV Shows
          <small className="ml-2 text-sm text-zinc-600">{category}</small>
        </h1>
        <div className="w-[50%]">
          <TopNav />
        </div>

        <Dropdown
          title="Category"
          options={["on_the_air", "popular", "top_rated", "airing_today"]}
          func={setCategory}
        />
        <div className="w-[2%]"></div>
      </div>

      <InfiniteScroll
        dataLength={tvshows.length}
        next={getTvshows}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tvshows} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default TvShows;
