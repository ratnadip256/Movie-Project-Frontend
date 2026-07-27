import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import AddSection from "../AddSection/AddSection";
import MovieApi from "../../Utils/MovieApi";
import Loader from "../../Loader/Loader";
import MovieCards from "../MovieCards/MovieCards";
import { MovieContext } from "../../Utils/Context/MovieContext";
import StyledWrapper from "../MovieCards/TrendingForU_Button/StyledWrapper";
import TopRatedButton from "../Top_rated/Top_Rated_Button/TopRatedButton";
import { TopRatedContext } from "../../Utils/Context/TopRatedContext";
import TopCards from "../Top_rated/Top_Cards/TopCards";
import { Link } from "react-router-dom";
import Showcase from "../AddSection/Showcase";

const Home = () => {
  const [add, setAdd] = useState(null);
  const [cards, setCards] = useState(null);
  const [top, setTop] = useState(null);
  const [category, setCategory] = useState("all");

  const getAdd = async () => {
    try {
      const { data } = await MovieApi.get(`/trending/all/day`);
      setAdd(data.results.slice(0, 5));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const trendingCards = async () => {
    try {
      const { data } = await MovieApi.get(`/trending/${category}/day`);
      setCards(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const TopRatedMovies = async () => {
    try {
      const { data } = await MovieApi.get(`/movie/top_rated`);
      setTop(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    trendingCards();
  }, [category]);

  useEffect(() => {
    getAdd();
    TopRatedMovies();
  }, []);

  document.title = "Scenix - Homepage";

  if (!add || !cards || !top) return <Loader />;

  return (
    <MovieContext.Provider value={{ cards }}>
      <div className="w-full min-h-screen">
        <Navbar />

        <div className="w-[95vw] h-[72vh] flex ml-10 mt-5 rounded-2xl transition-all duration-300 shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f] overflow-hidden">
          <Showcase list={add} />
        </div>

        <div className="mt-6 ml-10 flex justify-between items-center relative z-10 bg-[#1c1c23]">
          <StyledWrapper />

          <div className="font-[gilroy] bg-[#1c1c23] flex font-semibold rounded-2xl mr-10 px-4 py-2 p-1 text-white border border-[#212121] transition-all duration-300 shadow-[5px_5px_12px_#000,-5px_-5px_12px_#2f2f2f] active:text-[#666] active:shadow-[inset_4px_4px_12px_#000,inset_-4px_-4px_12px_#1f1f1f] z-10">
            <Link to="/trending_movies">
              View All <i className="ri-share-circle-line"></i>
            </Link>
          </div>
        </div>

        <MovieCards />

        <TopRatedContext.Provider value={{ top }}>
          <div className="mt-5 ml-10 bg-[#1c1c23] flex justify-between relative z-10">
            <TopRatedButton />
            <div className="font-[gilroy] bg-[#1c1c23] flex font-semibold rounded-2xl mr-10 px-4 py-2 p-1 text-white border border-[#212121] transition-all duration-300 shadow-[5px_5px_12px_#000,-5px_-5px_12px_#2f2f2f] active:text-[#666] active:shadow-[inset_4px_4px_12px_#000,inset_-4px_-4px_12px_#1f1f1f] z-10">
              <Link to="/all_Top_rated_movies">
                View All <i className="ri-share-circle-line"></i>
              </Link>
            </div>
          </div>

          <TopCards />
        </TopRatedContext.Provider>
      </div>
    </MovieContext.Provider>
  );
};

export default Home;
