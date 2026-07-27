import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideos = useSelector((state) => state[category].info.videos);

  if (!ytvideos) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center text-white">
        <p>No YouTube video available</p>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 right-5 text-3xl"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className="absolute z-10 top-0 left-0 w-screen min-h-screen flex items-center justify-center ">
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#65566CD] ri-close-fill text-3xl text-white right-[5%] top-[5%]"
      ></Link>
      <ReactPlayer
        className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
        playing={true}
        controls={true}
        height={600}
        width={1300}
        src={`https://www.youtube.com/watch?v=${ytvideos.key}`}
      />
    </div>
  );
};

export default Trailer;
