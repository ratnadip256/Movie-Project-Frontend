import MovieApi from "../../../Utils/MovieApi";
import { loadpeople } from "../reducers/peopleSlice";
export { removepeople } from "../reducers/peopleSlice";

export const asyncLoadpeople = (id) => async (dispatch, getstate) => {
  try {
    const detail = await MovieApi.get(`/person/${id}`);
    const externalid = await MovieApi.get(`/person/${id}/external_ids`);
    const combinedCredits = await MovieApi.get(`/person/${id}/combined_credits`);
    const tvCredits = await MovieApi.get(`/person/${id}/tv_credits`);
    const movieCredits = await MovieApi.get(`/person/${id}/movie_credits`);
    
    let ultimatedata = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data,
    };

    dispatch(loadpeople(ultimatedata));

    console.log(ultimatedata);
  } catch (error) {
    console.log("error: ", error);
  }
};
