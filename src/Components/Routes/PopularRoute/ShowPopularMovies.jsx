import React from "react";
const noImage = "/assets/png/noImage.png";
import { Link } from "react-router-dom";

const ShowPopularMovies = ({ data, title }) => {
  return (
    <>
      <div className="h-full w-full p-4 flex justify-center flex-wrap gap-6 left-0 top-0">
        {data.map((movie, i) => (
          <Link
            to={`/${movie.media_type || title}/details/${movie.id}`}
            key={i}
          >
            <img
              className="h-70 w-55 object-cover overflow-hidden rounded-xl shadow-[5px_5px_12px_#000,-5px_-5px_12px_#2f2f2f] "
              src={
                movie.backdrop_path || movie.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      movie.backdrop_path || movie.profile_path
                    }`
                  :  src={noImage}
              }
              alt=""
            />
            <div>
              <h1 className="flex justify-center w-[200px] text-white text-sm mt-2 font-bold font-[mona-sans]">
                {movie.name || movie.title || movie.original_name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ShowPopularMovies;
