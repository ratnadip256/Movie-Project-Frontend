import MovieApi from "../../../Utils/MovieApi";
import { loadmovie } from "../reducers/moviesSlice";
export { removemovie } from "../reducers/moviesSlice";

export const asyncLoadMovie = (id) => async (dispatch, getstate) => {
  try {
    const detail = await MovieApi.get(`/movie/${id}`);
    const externalid = await MovieApi.get(`/movie/${id}/external_ids`);
    const recommendations = await MovieApi.get(`/movie/${id}/recommendations`);
    const similar = await MovieApi.get(`/movie/${id}/similar`);
    const videos = await MovieApi.get(`/movie/${id}/videos`);
    const watchProviders = await MovieApi.get(`/movie/${id}/watch/providers`);
    const images = await MovieApi.get(`/movie/${id}/images`);

    let ultimatedata = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchProviders: watchProviders.data.results.IN,
      images: images.data,
    };

    dispatch(loadmovie(ultimatedata));

    console.log(ultimatedata);
  } catch (error) {
    console.log("error: ", error);
  }
};
