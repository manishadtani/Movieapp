export { removemovie } from "../reducers/movieSlice";
import axios from "../../utils/Axios";
import { loadmovie } from "../reducers/movieSlice";

export const asyncLoadmovie = (id) => async (dispatch, getState) => {
  try {
    const  detail  = await axios.get(`/movie/${id}`);
    const  externalid  = await axios.get(`/movie/${id}/external_ids`);
    const  recommendations  = await axios.get(`/movie/${id}/recommendations`);
    const  translations  = await axios.get(`/movie/${id}/translations`);
    const  similar  = await axios.get(`/movie/${id}/similar`);
    const  videos  = await axios.get(`/movie/${id}/videos`);
    const  watchproviders  = await axios.get(`/movie/${id}/watch/providers`);

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
    
    dispatch(loadmovie(ultimatedata));
    
  } catch (error) {
    console.log(error);
  }
};
