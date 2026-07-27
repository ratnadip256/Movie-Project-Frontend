import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieApi from "../../../Utils/MovieApi";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader2 from "../../Loader2/Loader2";
import ShowPeople from "./ShowPeople";

const PeopleRoute = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  //! API Selector
  const getApiEndpoint = () => {

    document.title = "Scenix - People";


    switch (category) {
      default:
        return `person/popular?page=${page}`;
    }
  };

  //! Fetch Movies
  const fetchMovies = async () => {
    try {
      const endpoint = getApiEndpoint();
      const { data } = await MovieApi.get(endpoint);

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

  //! Reset on Filter Change
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchMovies();
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
            People
          </h1>
        </div>
      </div>

      {movies.length === 0 ? (
        <Loader2 />
      ) : (
        <div className="text-white">
          <InfiniteScroll
            dataLength={movies.length}
            next={fetchMovies}
            hasMore={hasMore}
            loader={<Loader2 />}
          >
            <ShowPeople data={movies} title="people" />
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default PeopleRoute;
