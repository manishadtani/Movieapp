import axios from "../utils/Axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./templates/Loader";
import TopNav from "./templates/TopNav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";



const People = () => {

    const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "StarStream " + "| " + "People";

  console.log(person);

  const getPeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setPerson((prevState) => [...prevState, ...data.results]);
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
    if (person.length == 0) {
      getPeople();
    } else {
      setPage(1);
      setPerson([]);
      getPeople();
    }
  };

  useEffect(() => {
    refreshHandeler();
  }, [category]);





  return person.length ? (
    <div className=" py-3 w-screen h-screen ">
      {/* Header */}
      <div className="w-full flex items-center mb-4 px-5">
        <h1 className="text-2xl w-[20%] font-semibold text-zinc-400 flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer mr-2 "
          />
          People
  
        </h1>
        <div className="w-[50%]">
          <TopNav />
        </div>


        <div className="w-[2%]"></div>
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={getPeople}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
 
  
}

export default People