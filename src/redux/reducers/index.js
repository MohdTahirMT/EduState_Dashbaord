import { combineReducers } from "redux";
import Language_reducer from "./Language_reducer";

export const reducers = combineReducers({
  language: Language_reducer,
});
