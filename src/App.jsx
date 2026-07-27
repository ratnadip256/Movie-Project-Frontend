import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import ReactLenis from "lenis/react";

import Home from "./Components/Home/Home";
import ClickSpark from "./ClickEffect/ClickSpark";
import TrendingRoute from "./Components/Routes/TrendingSec/TrendingRoute";
import PopularRoute from "./Components/Routes/PopularRoute/PopularRoute";
import WebSeriesRoute from "./Components/Routes/WebSeriesRoute/WebSeriesRoute";
import PeopleRoute from "./Components/Routes/People/PeopleRoute";
import TvDetails from "./Components/All details/TvDetails";
import PeopleDetails from "./Components/All details/PeopleDetails";
import MovieDetails from "./Components/All details/MovieDetails";
import Trailer from "./Components/Trailer/Trailer";
import Top_rated_View from "./Components/Top_rated/Top_rated_View/Top_rated_View";

// Auth Imports
import AuthProvider from "./Components/Auth/AuthProvider";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import PublicRoute from "./Components/Routes/PublicRoute";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import VerifyOtp from "./Pages/Auth/VerifyOtp";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import VerifyForgotOtp from "./Pages/Auth/VerifyForgotOtp";
import ChangePassword from "./Pages/Auth/ChangePassword";

const App = () => {
  const location = useLocation();

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
      }}
    >
      <div className="min-h-screen w-full bg-[#1c1c23]">
        <AuthProvider>
          <Toaster position="top-center" />
          <ClickSpark
            sparkColor="#fff"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {/* Public Routes (Only accessible if NOT logged in) */}
                <Route element={<PublicRoute />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/verify-otp" element={<VerifyOtp />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/verify-forgot-otp" element={<VerifyForgotOtp />} />
                  <Route path="/change-password" element={<ChangePassword />} />
                </Route>

                {/* Protected Routes (Only accessible if logged in) */}
                <Route element={<ProtectedRoute />}>
                  {/* Movie App Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/trending_movies" element={<TrendingRoute />} />
                  <Route path="/movie/details/:id" element={<MovieDetails />}>
                    <Route path="/movie/details/:id/trailer" element={<Trailer />} />
                  </Route>
                  <Route path="/all_Top_rated_movies" element={<Top_rated_View />} />
                  <Route path="/all_popular_movies" element={<PopularRoute />} />
                  <Route path="/tv" element={<WebSeriesRoute />} />
                  <Route path="/tv/details/:id" element={<TvDetails />}>
                    <Route path="/tv/details/:id/trailer" element={<Trailer />} />
                  </Route>
                  <Route path="/people" element={<PeopleRoute />} />
                  <Route path="/people/details/:id" element={<PeopleDetails />} />
                </Route>
              </Routes>
            </AnimatePresence>
          </ClickSpark>
        </AuthProvider>
      </div>
    </ReactLenis>
  );
};

export default App;
