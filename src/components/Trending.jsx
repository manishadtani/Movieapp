import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import axios from "../utils/Axios";
import Cards from "./templates/Cards";
import Loader from "./templates/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  console.log(trending);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("ERROR:", error);
      setHasMore(false); // Stop infinite scrolling on error
    }
  };

  const refreshHandeler =  () => {
    if (trending.length == 0) {
      GetTrending();
    } else {
      setPage(1);
      setTrending([]);
      GetTrending()
    }
  };

  useEffect(() => {
    refreshHandeler();
  }, [category, duration]);

  return trending.length ? (
    <div className=" py-3 w-screen h-screen ">
      {/* Header */}
      <div className="w-full flex items-center mb-4 px-5">
        <h1 className="text-2xl w-[20%] font-semibold text-zinc-400 flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer mr-2"
          />
          Trending
        </h1>
        <div className="w-[50%]">
          <TopNav />
        </div>

        <Dropdown
          title="Category"
          options={["tv", "movie"]}
          func={setCategory}
        />
        <div className="w-[2%]"></div>
        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={setDuration}
        />
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Trending;
