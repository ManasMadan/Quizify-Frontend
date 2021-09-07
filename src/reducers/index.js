import changeTheme from "./darkThemeReducers";
import changeStyle from "./styleReducers";
import changeLoginState from "./loginReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  changeTheme,
  changeStyle,
  changeLoginState,
});

export default rootReducer;
