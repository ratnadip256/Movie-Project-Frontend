import React from "react";
import { TopMovies } from "../../../Utils/Context/TopRatedContext";
import TopGallery from "../TopGallery/TopGallery";

const MovieCards = () => {
  const { top } = TopMovies();

  const galleryItems = top
    ? top
        .filter((item) => item.poster_path)
        .map((item) => ({
          image: `https://image.tmdb.org/t/p/original${item.poster_path}`,
        }))
    : [];

  return (
    <div className="bg-[#1c1c23]">
      <div
        className="relative ml-10 -mt-15 w-[95vw] bg-[#1c1c23]"
        style={{ height: "380px" }}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-20 h-64 w-30 bg-gradient-to-r from-[#1c1c23] to-transparent pointer-events-none z-10"></div>

        {/* Right fade */}
        <div className="absolute right-0 top-20 h-64 w-30 bg-gradient-to-l from-[#1c1c23] to-transparent pointer-events-none z-10"></div>

        <TopGallery
          items={galleryItems}
          bend={1}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div>
    </div>
  );
};

export default MovieCards;
