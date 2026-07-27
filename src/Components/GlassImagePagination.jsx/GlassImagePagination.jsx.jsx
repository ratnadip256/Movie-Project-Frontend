import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const GlassImagePagination = ({ data }) => {
  const MAX_ITEMS = 20;

  const baseImages = Array.isArray(data)
    ? data.filter((i) => i.backdrop_path).slice(0, MAX_ITEMS)
    : [];

  if (baseImages.length === 0) {
    return <p className="text-center text-white/60 italic">No images</p>;
  }

  // DUPLICATE TRACK (KEY FIX)
  const images = [...baseImages, ...baseImages];

  const [index, setIndex] = useState(0);
  const total = baseImages.length;

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  //  RESET INDEX SILENTLY
  useEffect(() => {
    if (index >= total) {
      setTimeout(() => {
        setIndex(0);
      }, 500);
    }
    if (index < 0) {
      setTimeout(() => {
        setIndex(total - 1);
      }, 500);
    }
  }, [index, total]);

  return (
    <div className="relative w-full px-6 py-6">
      <div className="relative h-70 bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl overflow-hidden">

        {/* //! SLIDER TRACK */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${index * 20}%)`,
          }}
        >
          {images.map((movie, i) => (
            <div key={i} className="min-w-[20%] px-2">
              <Link to={`/${movie.media_type || movie.title}/details/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.title || movie.name}
                  className="w-full h-[190px] object-cover rounded-xl shadow-xl"
                />
              </Link>
              <h1 className={`flex justify-center text-sm mt-2 mx-auto w-[200px] font-bold font-[mona-sans]`}>{movie.name || movie.title || movie.original_name}</h1>
            </div>
          ))}
        </div>

        {/* //! LEFT */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2
                     h-12 w-12 rounded-full bg-white/20 backdrop-blur-md
                     flex items-center justify-center text-white"
        >
          <ChevronLeft size={28} />
        </button>

        {/* //!RIGHT */}
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2
                     h-12 w-12 rounded-full bg-white/20 backdrop-blur-md
                     flex items-center justify-center text-white"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default GlassImagePagination;
