import React, { useEffect, useState } from "react";
import SideBar from "./templates/SideBar";
import TopNav from "./templates/TopNav";
import Header from "./templates/Header";
import axios from "../../src/utils/Axios";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loader from "./templates/Loader";

const Home = () => {
  document.title = "Movie App | Home";

  const [wallpaper, setWallpaper] = useState(null);
  const [Trending, setTrending] = useState([]);
  const [caterogy, setCaterogy] = useState("all");

  const GetHeaderWallpaper = async (setWallpaper) => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      setWallpaper(
        data.results[Math.floor(Math.random() * data.results.length)]
      );
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${caterogy}/day`);
      setTrending(data.results);
      //   console.log(data.results);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper(setWallpaper);
  }, [caterogy]);
  // console.log(Trending)

  return wallpaper && Trending ? (
    <>
      <SideBar data={wallpaper} />
      <div className="w-[80%] h-full overflow-auto">
        <TopNav />
        <Header data={wallpaper} />
        <div className="w-full  p-5">
          <div className="mb-5 flex justify-between">
            <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
            <Dropdown title="Filter" options={["tv", "movie", "all"]} func={setCaterogy} />
          </div>
        </div>
        <HorizontalCards data={Trending} setCaterogy={setCaterogy} />
      </div>
    </>
  ) : (
    <Loader/>
  );
};

export default Home;
