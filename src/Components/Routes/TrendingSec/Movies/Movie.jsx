import React from "react";
import { Link } from "react-router-dom";
const noImage = "/assets/Avatar/avatar.jpg";

const Movie = ({ data, title }) => {
  return (
    <>
      <div className="h-full w-full p-4 flex justify-center flex-wrap gap-6">
        {data.map((movie, i) => (
          <Link
            to={`/${movie.media_type || title}/details/${movie.id}`}
            key={i}
            className="flex flex-col items-center"
          >
            <img
              className="h-[280px] w-[220px] object-cover rounded-xl shadow-[5px_5px_12px_#000,-5px_-5px_12px_#2f2f2f]"
              src={
                movie.backdrop_path || movie.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      movie.backdrop_path || movie.profile_path
                    }`
                  : noImage
              }
              alt=""
            />

            <h1 className="w-[220px] text-center text-white text-sm mt-2 font-bold font-[mona-sans]">
              {movie.name || movie.title || movie.original_name}
            </h1>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Movie;
