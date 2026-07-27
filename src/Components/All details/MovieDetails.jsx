import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncLoadMovie,
  removemovie,
} from "../../Redux/Store/actions/movieActions.jsx";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader2 from "../Loader2/Loader2.jsx";
import GlassImagePagination from "../GlassImagePagination.jsx/GlassImagePagination.jsx";
import { Outlet } from "react-router-dom";

const MovieDetails = () => {
  document.title = "Scenix - MovieDetails";
  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { info } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(asyncLoadMovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id, dispatch]);

  {
    /* //! Runtime calculate logic */
  }
  const runtime = info?.detail?.runtime;
  const hours = runtime ? Math.floor(runtime / 60) : null;
  const minutes = runtime ? runtime % 60 : null;

  if (!info) {
    return <Loader2 />;
  }

  return (
    <div
      style={{
        background: `
          linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.8)),
          url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})
        `,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-full min-h-screen"
    >
      {/* //! BAck Button */}
      <div className="h-full w-full p-6 text-white">
        <div className="flex gap-3">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-s-line text-white text-xl px-1 py-1 border-white/30 bg-white/10 backdrop-blur-lg shadow-md rounded-full"
          />
          <h1 className="px-4 py-1 border-white/30 bg-white/10 backdrop-blur-lg shadow-md rounded-full text-xl font-semibold">
            Movie detail
          </h1>
        </div>

        <div className="h-full w-full flex justify-center mt-8">
          <div className="h-[60vh] w-[92vw] flex bg-white/10 backdrop-blur-md shadow-md rounded-2xl p-8">
            {/* //! Movie Poster */}
            <div className="flex flex-col">
              <img
                className="h-70 w-55 object-cover rounded-xl shadow-xl"
                src={`https://image.tmdb.org/t/p/original/${
                  info.detail.backdrop_path || info.detail.poster_path
                }`}
                alt=""
              />

              {/* //! Movie WatchProvider */}
              <div className="w-[80%] mt-3">
                <h1 className="text-xl font-semibold">Available On:</h1>

                {info.watchProviders?.flatrate?.length > 0 ? (
                  <div className="mt-3 flex gap-3 flex-wrap">
                    {info.watchProviders.flatrate.map((w) => (
                      <img
                        key={w.provider_id}
                        className="w-[5vh] h-[5vh] object-cover rounded-md"
                        src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                        alt={w.provider_name}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm opacity-80 italic">
                    Data not available
                  </p>
                )}
              </div>
            </div>

            {/* //! Title */}
            <div className="gap-2 font-semibold ml-9">
              <h1 className="text-5xl">
                {info.detail.title ||
                  info.detail.name ||
                  info.detail.original_name ||
                  info.detail.original.title}
                <span className="text-2xl">
                  {" "}
                  - ({info.detail.release_date.split("-")[0]})
                </span>
              </h1>

              {/* //! IMDB */}
              <div className="flex items-center gap-2 mt-2">
                <div className="w-10 bg-amber-300 rounded-md text-center text-black text-xs font-semibold">
                  IMDB
                </div>
                <span className="text-sm flex gap-1">
                  {info.detail.vote_average}
                  <i className="ri-star-fill text-amber-300"></i>
                </span>
              </div>

              {/* //! Details */}
              <div className="flex mt-2 gap-3 text-base  whitespace-nowrap">
                <span>{info.detail.status}</span>

                <span className="opacity-30">|</span>

                <span>
                  Language: {info.detail.original_language.toUpperCase()}
                </span>

                <span className="opacity-30">|</span>

                <span>
                  {info.detail.genres.map((g) => g.name).join(" and ")}
                </span>

                <span className="opacity-30">|</span>

                <span>
                  {hours} {hours === 1 ? "hour" : "hours"} {minutes}{" "}
                  {minutes === 1 ? "minute" : "minutes"}
                </span>
              </div>

              {/* //! Tagline */}
              <div className="flex mt-2 gap-2">
                <i class="ri-speak-fill text-white text-xl"></i>
                <h1 className="text-xl italic opacity-80">
                  {info?.detail?.tagline ? `“${info.detail.tagline}”` : ""}
                </h1>
              </div>

              {/* //! Overview */}
              <div className="flex flex-col mt-2">
                <h1>StoryLine :</h1>
                <p className="text-base italic w-[60vw]">
                  {info.detail.overview}
                </p>
              </div>

              {/* //! Trailer */}
              <div className="flex mt-3">
                <Link
                  to={`${pathname}/trailer`}
                  className="group flex items-center gap-2 bg-white text-black font-[gilroy] font-semibold rounded-full px-3 py-2 
               transition-all duration-200 ease-out active:scale-95 hover:bg-gray-200"
                >
                  <i className="ri-play-circle-line text-xl transition-transform duration-200 group-active:scale-90"></i>
                  <span>Play Trailer</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* //! Images screenshot */}
        {info?.images?.backdrops && (
          <div className="flex flex-col p-4 mt-4">
            <h1 className="font-semibold text-3xl">Snippets</h1>
            <div className="mt-5 h-[80vh] w-[93vw] bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 h-full">
                {info?.images?.backdrops?.slice(0, 10).map((img) => (
                  <img
                    key={img.file_path}
                    src={`https://image.tmdb.org/t/p/original/${img.file_path}`}
                    className="w-full h-full object-cover rounded-xl shadow-xl"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="p-4 mt-5">
          <h1 className="font-semibold text-2xl">
            Recommendations & Similar Movies
          </h1>
          <GlassImagePagination
            data={
              info?.recommendations?.length > 0
                ? info.recommendations
                : info?.similar || []
            }
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetails;
