import React from "react";
import CircularGallery from "./Cards/CircularGallery";
import { useMovies } from "../../Utils/Context/MovieContext";

const MovieCards = () => {
  const { cards } = useMovies();

  const galleryItems = cards
    ? cards
        .filter((item) => item.poster_path)
        .map((item) => ({
          image: `https://image.tmdb.org/t/p/original${item.poster_path}`,
        }))
    : [];

  return (
    <div className="bg-[#1c1c23]">
      <div
        className="relative ml-10 -mt-16 w-[95vw] bg-[#1c1c23]"
        style={{ height: "380px" }}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-20 h-64 w-30 bg-linear-to-r from-[#1c1c23] to-transparent pointer-events-none z-10"></div>

        {/* Right fade */}
        <div className="absolute right-0 top-20 h-64 w-30 bg-linear-to-l from-[#1c1c23] to-transparent pointer-events-none z-10"></div>

        <CircularGallery
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
