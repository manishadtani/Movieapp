import React from "react";
import notfoundgif from "../assets/404.gif";
import { useNavigate } from "react-router-dom";

const Notfound = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen fixed flex justify-center items-center bg-black">
            <i
                onClick={() => navigate(-1)}
                className="top-10 right-10 text-3xl absolute hover:text-[#6556CD] ri-close-large-line cursor-pointer"
            />
            <img className="h-full w-full object-cover" src={notfoundgif} alt="Not Found" />
        </div>
    );
};

export default Notfound;
