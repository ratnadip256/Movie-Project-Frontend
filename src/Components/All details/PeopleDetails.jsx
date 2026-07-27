import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncLoadpeople,
  removepeople,
} from "../../Redux/Store/actions/peopleAction.jsx";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loader2 from "../Loader2/Loader2.jsx";
import MovieCredits from "./People_Credits/Movie_Credits/MovieCredits.jsx";

const PeopleDetails = () => {
  document.title = "Scenix - PeopleDetails";

  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { info } = useSelector((state) => state.people);

  useEffect(() => {
    dispatch(asyncLoadpeople(id));
    return () => {
      dispatch(removepeople());
    };
  }, [id, dispatch]);

  if (!info) {
    return <Loader2 />;
  }
  return (
    <div className="w-full min-h-screen">
      {/* //! BAck Button */}
      <div className="h-full w-full p-8 text-white">
        <div className="flex gap-4">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-s-line text-white text-xl px-1 py-1 shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f] rounded-full active:text-[#666] active:shadow-[inset_4px_4px_12px_#000,inset_-4px_-4px_12px_#1f1f1f]"
          />
          <h1 className="px-4 py-1 font-[gilroy] shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f] rounded-full text-xl font-semibold text-white">
            People Details
          </h1>
        </div>

        {/* //! Image And Description */}
        <div className="flex mt-16 gap-12 justify-center">
          <div className="h-[50vh] w-[20vw] shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f] flex justify-center rounded-[40px]">
            <img
              className="h-full w-full object-cover overflow-hidden rounded-[40px]"
              src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
              alt=""
            />
          </div>
          <div className="h-[50vh] w-[40vw] shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f] font-[gilroy] font-semibold rounded-[30px]">
            {/* //! Personal Details */}
            <div className="flex flex-col p-7">
              <h1 className="text-6xl">{info.detail.name}</h1>
              <div className="p-2 px-4">
                <p className="mt-2 text-x font-semibold px-2 text-white">
                  Known For :{" "}
                  <span className="text-[#a1a0aa]">
                    {info.detail.known_for_department}
                  </span>
                </p>
                <p className="mt-1 text-x font-semibold px-2 text-white">
                  Gender :{" "}
                  <span className="text-[#a1a0aa]">
                    {info.detail.gender === 2 ? "Male" : "Female"}
                  </span>
                </p>
                <p className="mt-1 text-x font-semibold px-2 text-white">
                  BirthDay <i class="ri-cake-fill"></i> :{" "}
                  <span className="text-[#a1a0aa]">{info.detail.birthday}</span>
                </p>
                <p className="mt-1 text-x font-semibold px-2 text-white">
                  Place Of BirthDay <i class="ri-map-pin-fill"></i> :{" "}
                  <span className="text-[#a1a0aa]">
                    {info.detail.place_of_birth}
                  </span>
                </p>
                <p className="mt-1 text-x font-semibold px-2 text-white">
                  {info.detail.deathday && `DeathDay: ${info.detail.deathday}`}
                </p>
              </div>

              <div className="flex justify-center mt-3">
                <hr className="w-90" />
              </div>

              {/* //! Socials */}
              <div className="flex flex-col mt-3">
                <div className="flex items-center gap-x-1">
                  <p className="text-xl">
                    <i class="ri-send-plane-fill"></i>
                  </p>
                  <h1 className="text-2xl">Socials :</h1>
                </div>

                {/* //! Socials icons */}
                <div className="text-white flex gap-x-5 mt-2 px-4">
                  {info.externalid.wikidata_id && (
                    <a
                      className="flex gap-2 items-center"
                      target="_blank"
                      href={`https://www.wikidata.org/wiki/Special:EntityData/${info.externalid.wikidata_id}`}
                    >
                      <i class="ri-earth-line text-2xl"></i>
                      <p className="font-semibold text-[#a1a0aa]">wikipedia</p>
                    </a>
                  )}

                  {info.externalid.instagram_id && (
                    <a
                      className="flex gap-2 items-center"
                      target="_blank"
                      href={`https://www.instagram.com/${info.externalid.instagram_id}`}
                    >
                      <i class="ri-instagram-line text-2xl"></i>
                      <p className="font-semibold text-[#a1a0aa]">Instagram</p>
                    </a>
                  )}

                  {info.externalid.twitter_id && (
                    <a
                      className="flex gap-2 items-center"
                      target="_blank"
                      href={`https://x.com/iamsrk/${info.externalid.twitter_id}`}
                    >
                      <i class="ri-twitter-line text-2xl"></i>
                      <p className="font-semibold text-[#a1a0aa]">Twitter</p>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* //! Biography */}
        <div className="h-full w-full flex flex-col mt-10 p-3">
          <h1 className="text-4xl font-semibold tracking-wide animate-pulse">
            Biography ~
          </h1>
          <p className="mt-3 w-[80vw] ml-6 text-xl italic">
            " {info.detail.biography} "
          </p>
        </div>
        <div className="mt-10 flex flex-col">
          <h1 className="text-4xl font-semibold">
            {info.detail.name}'s Filmography ~
          </h1>
          <MovieCredits
            data={
              info?.combinedCredits?.cast?.length > 0
                ? info.combinedCredits.cast
                : []
            }
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default PeopleDetails;
