import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MovieApi from "../Utils/MovieApi";
const noImage = "/assets/png/noImage.png";
import AvatarMenu from "./Profile_UI/AvatarMenu";

const Nav = () => {
  const [search, setSearch] = useState("");

  const [movie, setMovie] = useState(null);

  const getMovie = async () => {
    try {
      const { data } = await MovieApi.get(`/search/multi?query=${search}`);
      setMovie(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie();
  }, [search]);

  return (
    <>
      <nav className="w-full flex justify-between px-10 py-6 items-center">
        <div className="options1 flex items-center font-semibold font-[gilroy]">
          <h1 className="logo font-[logo] text-2xl text-white">Scenix</h1>
          <div className="flex ml-12 gap-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white border-2 border-transparent rounded-full px-3 py-1 transition-all duration-300 ${
                  isActive
                    ? "shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f] active:text-[#666] active:shadow-[inset_4px_4px_12px_#000,inset_-4px_-4px_12px_#1f1f1f]"
                    : "shadow-none"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/trending_movies"
              className={({ isActive }) =>
                `text-white border-2 border-transparent rounded-full px-3 py-1 transition-all duration-300 ${
                  isActive
                    ? "shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f] "
                    : "shadow-none"
                }`
              }
            >
              <i class="ri-fire-fill"></i>Trending
            </NavLink>
            <NavLink
              to="/all_popular_movies"
              className={({ isActive }) =>
                `text-white border-2 border-transparent rounded-full px-3 py-1 transition-all duration-300 ${
                  isActive
                    ? "shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f] active:text-[#666] active:shadow-[inset_4px_4px_12px_#000,inset_-4px_-4px_12px_#1f1f1f]"
                    : "shadow-none"
                }`
              }
            >
              Popular
            </NavLink>
            <NavLink
              to="/tv"
              className={({ isActive }) =>
                `text-white border-2 border-transparent rounded-full px-3 py-1 transition-all duration-300 ${
                  isActive
                    ? "shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f] active:text-[#666] active:shadow-[inset_4px_4px_12px_#000,inset_-4px_-4px_12px_#1f1f1f]"
                    : "shadow-none"
                }`
              }
            >
              Web Series
            </NavLink>
            <NavLink
              to="/people"
              className={({ isActive }) =>
                `text-white border-2 border-transparent rounded-full px-3 py-1 transition-all duration-300 ${
                  isActive
                    ? "shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f] active:text-[#666] active:shadow-[inset_4px_4px_12px_#000,inset_-4px_-4px_12px_#1f1f1f]"
                    : "shadow-none"
                }`
              }
            >
              People
            </NavLink>
          </div>
        </div>

        <div className="options2 flex gap-6 items-center">
          {/* //!searchbar */}
          <div className="searchbar w-70 flex items-center font-[gilroy] font-semibold bg-transparent rounded-full px-12 py-1 h-10 shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f] relative transition-all duration-300 ">
            <i class="ri-search-line  text-white text-xl absolute left-4 flex items-center"></i>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search..."
              className="bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
            {search.length > 0 && (
              <i
                onClick={() => setSearch("")}
                class="ri-close-large-line hover:bg-zinc-700 px-2 py-1 hover:rounded-2xl text-white transition-all duration-300"
              ></i>
            )}

            {/* //!searchResult */}
            {movie && movie.length > 0 && (
              <div
                data-lenis-prevent
                data-lenis-prevent-wheel
                className="searchResult absolute w-72 h-72 z-10 border-2 p-3 left-0 right-0 top-full rounded-2xl mt-2 border-white/30 bg-white/10 backdrop-blur-lg overflow-hidden"
              >
                <div
                  data-lenis-prevent
                  data-lenis-prevent-wheel
                  className="overflow-auto h-full "
                >
                  {movie.map((m, i) => (
                    <Link
                      to={`/${m.media_type}/details/${m.id}`}
                      key={i}
                      className="w-[97%] mb-2 flex justify-start items-center rounded-2xl font-semibold text-zinc-400 hover:text-white  transition-all duration-300"
                    >
                      <img
                        className="h-15 w-11 object-cover rounded mr-5 shadow"
                        src={
                          m.backdrop_path || m.profile_path
                            ? `https://image.tmdb.org/t/p/original/${
                                m.backdrop_path || m.profile_path
                              }`
                            : noImage
                        }
                        alt=""
                      />
                      <p>
                        {m.name || m.title || m.original_name}
                        <div className="flex justify-start">
                          <p className="bg-[#e2b616] font-[gilroy] w-10 h-4 text-xs rounded mt-1 flex justify-center text-center text-black">
                            IMDb
                          </p>
                          <i class="ri-shining-2-fill ml-1.5 text-[12px] text-center flex justify-start mt-1 text-[#f5c518] "></i>
                          <p className="text-white text-[14px] ml-1 mt-0.5 flex justify-start">
                            {m.vote_average || m.rating
                              ? m.vote_average || m.rating
                              : "4"}
                          </p>
                        </div>
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* //!Notification */}
          <div className="notification text-amber-50 text-2xl">
            <i class="ri-notification-4-line"></i>
          </div>

          {/* //!profile */}
          <div className="profile z-100 rounded-full text-amber-50 text-3xl shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f]">
            <AvatarMenu />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
