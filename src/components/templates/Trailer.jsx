import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Notfound from "../Notfound";

const Trailer = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytvideo = useSelector((state) => state[category]?.info?.videos);

    return (
        <div className="h-screen w-screen fixed flex justify-center items-center bg-black bg-opacity-80 top-0 left-0 text-white z-50">
            <i
                onClick={() => navigate(-1)}
                className="top-10 right-10 text-3xl absolute hover:text-[#6556CD] ri-close-large-line cursor-pointer mr-2"
            />
            {ytvideo ? (
                <ReactPlayer
                    className="react-player"
                    url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
                    width="80%"
                    height="80%"
                    controls
                />
            ) : (
                <Notfound />
            )}
        </div>
    );
};

export default Trailer;
