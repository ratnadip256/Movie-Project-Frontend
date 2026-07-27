import React, { useEffect, useState } from "react";
import Filter from "../../MovieCards/DropDown-Filter/Filter";
import { useNavigate } from "react-router-dom";
import MovieApi from "../../../Utils/MovieApi";
import Loader from "../../../Loader/Loader";
import ShowMovies from "./ShowMovies";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader2 from "../../Loader2/Loader2";

const Top_rated_View = () => {
  const navigate = useNavigate();
   document.title = "Scenix - TopRated";
  const [category, setCategory] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTopRated = async () => {
    try {
      const { data } = await MovieApi.get(`movie/top_rated?page=${page}`);

      const results = data.results || [];

      if (results.length === 0) {
        setHasMore(false);
        return;
      }

      setMovies((prev) => [...prev, ...results]);

      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    getTopRated();
  }, [category]);

  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-between items-center p-6">
        <div className="flex gap-4">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-s-line text-white text-xl px-1 py-1 shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f] rounded-full active:text-[#666] active:shadow-[inset_4px_4px_12px_#000,inset_-4px_-4px_12px_#1f1f1f]"
          />
          <h1 className="px-4 py-1 font-[gilroy] shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f] rounded-full text-xl font-semibold text-white">
            Top Rated
          </h1>
        </div>

        <div className="font-[gilroy] bg-[#1c1c23] flex font-semibold rounded-full px-3 py-2 p-2 text-white border border-[#212121] transition-all duration-300 shadow-[5px_5px_12px_#000,-5px_-5px_12px_#2f2f2f] active:text-[#666] active:shadow-[inset_4px_4px_12px_#000,inset_-4px_-4px_12px_#1f1f1f]">
          <i className="ri-filter-2-fill text-white" />
          <Filter
            title="Movies"
            options={[{ label: "Movie", value: "movie" }]}
          />
        </div>
      </div>

      {movies.length === 0 ? (
        <Loader2 />
      ) : (
        <div className="text-white">
          <InfiniteScroll
            dataLength={movies.length}
            next={getTopRated}
            hasMore={hasMore}
            loader={<Loader2 />}
          >
            <ShowMovies data={movies} title="movie" />
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default Top_rated_View;
