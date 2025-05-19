import axios from "../utils/Axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./templates/Loader";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const Movie = () => {

    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = "Movie App "+"| "+"Movies"
    
    console.log(movies);
  
    const getMovies = async () => {
      try {
        const { data } = await axios.get(
          `/movie/${category}?page=${page}`
        );
        if (data.results.length > 0) {
          setMovies((prevState) => [...prevState, ...data.results]);
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
        if (movies.length == 0) {
          getMovies();
        } else {
          setPage(1);
          setMovies([]);
          getMovies()
        }
      };
    
      useEffect(() => {
        refreshHandeler();
      }, [category]);
  
      

  return movies.length ? (
    <div className=" py-3 w-screen h-screen ">
      {/* Header */}
      <div className="w-full flex items-center mb-4 px-5">
        <h1 className="text-2xl w-[20%] font-semibold text-zinc-400 flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer mr-2 "
          />
          Movies 
          <small className="ml-2 text-sm text-zinc-600" >
            {category}
          </small>
        </h1>
        <div className="w-[50%]">
          <TopNav />
        </div>

        <Dropdown
          title="Category"
          options={ ["popular", "top_rated", "upcoming", "now_playing"]}
          func={setCategory}
        />
        <div className="w-[2%]"></div>
        
      </div>

      <InfiniteScroll
        dataLength={movies.length}
        next={getMovies }
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={movies} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default Movie