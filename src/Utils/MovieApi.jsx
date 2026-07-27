import axios from "axios";
import React from "react";

const MovieApi = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
  }
})

export default MovieApi;