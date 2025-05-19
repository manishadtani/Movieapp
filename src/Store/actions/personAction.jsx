export { removeperson } from "../reducers/personSlice";
import axios from "../../utils/Axios";
import { loadperson } from "../reducers/personSlice";

export const asyncLoadperson = (id) => async (dispatch, getState) => {
  try {
    const  detail  = await axios.get(`/person/${id}`);
    const  externalid  = await axios.get(`/person/${id}/external_ids`);
    const  CombineCredits  = await axios.get(`/person/${id}/combined_credits`);
    const  tvCredits  = await axios.get(`/person/${id}/tv_credits`);
    const  movieCredits  = await axios.get(`/person/${id}/movie_credits`);

    const ultimatedata = {
        detail: detail.data,
        externalid: externalid.data,
        CombineCredits:CombineCredits.data,
        tvCredits:tvCredits.data,
        movieCredits:movieCredits.data
       
    }
    console.log(ultimatedata);
    
    dispatch(loadperson(ultimatedata));
    
  } catch (error) {
    console.log(error);
  }
};
