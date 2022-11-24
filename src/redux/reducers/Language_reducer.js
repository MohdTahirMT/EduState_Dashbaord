import { LANG } from "redux/constants";

const initTheme = {
  language: localStorage.getItem("langauge_selected"),
//   language: document.querySelector("html").lang,
};

const Language_reducer = (state = initTheme, action) => {
  switch (action.type) {
    case LANG:
      console.log(action.payload);
      localStorage.setItem("langauge_selected", action.payload);
      return { ...state, language: localStorage.getItem("langauge_selected") };
    default:
      return state;
  }
};

export default Language_reducer;
