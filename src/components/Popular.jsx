import axios from "../utils/Axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./templates/Loader";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const Popular = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "StarStream "+"| "+"Popular"
  
  console.log(popular);

  const getPopular = async () => {
    try {
      const { data } = await axios.get(
        `${category}/popular?page=${page}`
      );
      if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
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
      if (popular.length == 0) {
        getPopular();
      } else {
        setPage(1);
        setPopular([]);
        getPopular()
      }
    };
  
    useEffect(() => {
      refreshHandeler();
    }, [category]);
  




  return popular.length ? (
    <div className=" py-3 w-screen h-screen ">
      {/* Header */}
      <div className="w-full flex items-center mb-4 px-5">
        <h1 className="text-2xl w-[20%] font-semibold text-zinc-400 flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer mr-2"
          />
          Popular 
        </h1>
        <div className="w-[50%]">
          <TopNav />
        </div>

        <Dropdown
          title="Category"
          options={["movie", "tv"]}
          func={setCategory}
        />
        <div className="w-[2%]"></div>
        
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Popular;
