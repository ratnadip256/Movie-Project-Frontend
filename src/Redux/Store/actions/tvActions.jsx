import MovieApiApi from "../../../Utils/MovieApi";
import { loadtv } from "../reducers/tvSlice";
export { removetv } from "../reducers/tvSlice";

export const asyncLoadtv = (id) => async (dispatch, getstate) => {
  try {
    const detail = await MovieApiApi.get(`/tv/${id}`);
    const externalid = await MovieApiApi.get(`/tv/${id}/external_ids`);
    const recommendations = await MovieApiApi.get(`/tv/${id}/recommendations`);
    const similar = await MovieApiApi.get(`/tv/${id}/similar`);
    const videos = await MovieApiApi.get(`/tv/${id}/videos`);
    const watchProviders = await MovieApiApi.get(`/tv/${id}/watch/providers`);
    const images = await MovieApiApi.get(`/tv/${id}/images`);

    let ultimatedata = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchProviders: watchProviders.data.results.IN,
      images: images.data,
    };

    dispatch(loadtv(ultimatedata));

    console.log(ultimatedata);
  } catch (error) {
    console.log("error: ", error);
  }
};
