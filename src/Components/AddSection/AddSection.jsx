import React from "react";
import { Link, useLocation } from "react-router-dom";

const AddSection = ({ data, onPrev, onNext, fadeClass }) => {
  const { pathname } = useLocation();
  return (
    <>
      {/* //!Add section container */}
      <div className="relative w-[95vw] h-[72vh] overflow-hidden">

        {/* //! Transition Layer (Fade Animation Wrapper) */}
        <div className={`w-full h-full absolute inset-0 transition-opacity duration-700 ${fadeClass}`}>
          <img
            className="w-full h-full object-cover object-center"
            src={`https://image.tmdb.org/t/p/original/${
              data.backdrop_path || data.profile_path
            }`}
            alt=""
          />
        </div>

        <div className="absolute inset-0 p-10 mt-10 text-white">
          {/* //!Movie Title */}
          <h2 className=" text-8xl font-bold justify-start flex font-[mona-sans]">
            {data.name || data.title || data.original_name}
          </h2>

          {/* //!Movie para */}
          <p className="w-[60vw] mt-3 font-semibold">{data.overview}</p>

          {/* //!Release & movie type */}
          <div className="mt-3 gap-5 flex">
            <i class="ri-megaphone-fill text-amber-300 flex gap-1">
              <span className="text-white font-[mona-sans] font-semibold text-xs flex items-center">
                {data.release_date || data.first_air_date}
              </span>
            </i>
            <i class="ri-movie-2-ai-fill text-amber-300 flex gap-1">
              <span className="text-white font-[mona-sans] font-semibold text-xs flex items-center">
                {data.media_type.toUpperCase()}
              </span>
            </i>
            <i class="ri-translate-2 text-amber-300 flex gap-1">
              <span className="text-white font-[mona-sans] font-semibold text-xs flex items-center">
                {data.original_language.toUpperCase()}
              </span>
            </i>
          </div>

          {/* //!button of watch trailer */}
          <div className="flex mt-3">
            <Link
              to={`/${data.media_type || "movie"}/details/${data.id}/trailer`}
              className="group flex items-center gap-2 bg-white text-black font-[gilroy] font-semibold rounded-full px-3 py-2 
               transition-all duration-200 ease-out active:scale-95 hover:bg-gray-200"
            >
              <i className="ri-play-circle-line text-xl transition-transform duration-200 group-active:scale-90"></i>
              <span>Play Trailer</span>
            </Link>
          </div>
        </div>

        {/* //!SLIDER BUTTONS ADDED HERE */}
        <div className="absolute bottom-6 right-6 flex gap-3">

          <button
            onClick={onPrev}
            className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center 
                       hover:bg-white/60 active:scale-90 transition"
          >
            <i className="ri-arrow-left-s-line text-white text-2xl"></i>
          </button>

          <button
            onClick={onNext}
            className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center 
                       hover:bg-white/60 active:scale-90 transition"
          >
            <i className="ri-arrow-right-s-line text-white text-2xl"></i>
          </button>

        </div>

      </div>
    </>
  );
};

export default AddSection;
