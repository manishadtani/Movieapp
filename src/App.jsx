import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import TvShows from "./components/TvShows";
import People from "./components/People";
import Moviedetails from "./components/Moviedetails";
import TvShowsDetails from "./components/TvShowsDetails";
import PersonDetails from "./components/PersonDetails";
import Trailer from "./components/templates/Trailer";
import Notfound from "./components/Notfound";

const App = () => {
  return (
    <div className="w-full h-screen  bg-[#1F1E24] flex">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/popular" element={<Popular />}></Route>
        <Route path="/movie" element={<Movie />}></Route>
        <Route path="/movie/details/:id" element={<Moviedetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer/>} />
        </Route>
        <Route path="/tvshows" element={<TvShows />}></Route>
        <Route path="/tv/details/:id" element={<TvShowsDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer/>} ></Route>
        </Route>
        <Route path="/people" element={<People />}></Route>
        <Route path="/person/details/:id" element={<PersonDetails />}></Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </div>
  );
};

export default App;
