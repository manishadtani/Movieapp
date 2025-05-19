export { removetv } from "../reducers/tvSlice";
import axios from "../../utils/Axios";
import { loadtv } from "../reducers/tvSlice";

export const asyncLoadtv = (id) => async (dispatch, getState) => {
  try {
    const  detail  = await axios.get(`/tv/${id}`);
    const  externalid  = await axios.get(`/tv/${id}/external_ids`);
    const  recommendations  = await axios.get(`/tv/${id}/recommendations`);
    const  translations  = await axios.get(`/tv/${id}/translations`);
    const  similar  = await axios.get(`/tv/${id}/similar`);
    const  videos  = await axios.get(`/tv/${id}/videos`);
    const  watchproviders  = await axios.get(`/tv/${id}/watch/providers`);

    const ultimatedata = {
        detail: detail.data,
        externalid: externalid.data,
        recommendations: recommendations.data.results,
        translations: translations.data.translations.map((t) => t.english_name),
        similar: similar.data.results,
        videos: videos.data.results.find(m => m.type === "Trailer"),
        watchproviders: watchproviders.data.results.IN,
    }
    console.log(ultimatedata);
    
    dispatch(loadtv(ultimatedata));
    
  } catch (error) {
    console.log(error);
  }
};
