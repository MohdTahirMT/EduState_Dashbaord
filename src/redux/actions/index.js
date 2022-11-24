import { LANG } from "redux/constants";

export const Language_change = (data) => (dispatch) => {
  try {
    dispatch({ type: LANG, payload: data });
    localStorage.setItem("langauge_selected", data);
  } catch (error) {
    dispatch({ type: LANG, payload: error });
  }
};
