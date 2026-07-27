import React, { useEffect, useState } from "react";
import Filter from "../../MovieCards/DropDown-Filter/Filter";
import { useNavigate } from "react-router-dom";
import MovieApi from "../../../Utils/MovieApi";
import Movie from "./Movies/Movie";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader2 from "../../Loader2/Loader2";

const TrendingRoute = () => {

  document.title = "Scenix - Trending";

  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTrending = async () => {
    try {
      const { data } = await MovieApi.get(
        `/trending/movie/day?page=${page}`
      );  

      const results = data.results || [];

      if (results.length === 0) {
        setHasMore(false);
        return;
      }

      setTrending((prev) => [...prev, ...results]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    setTrending([]);
    setPage(1);
    setHasMore(true);
    getTrending();
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
            Trending
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

      <div className="text-white">
        <InfiniteScroll
          dataLength={trending.length}
          next={getTrending}
          hasMore={hasMore}
          loader={<Loader2 />}
        >
          <Movie data={trending} title="movie" />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default TrendingRoute;
