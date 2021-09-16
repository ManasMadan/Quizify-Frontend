import changeTheme from "./darkThemeReducers";
import changeStyle from "./styleReducers";
import changeLoginState from "./loginReducers";
import changeAlert from "./alertReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  changeTheme,
  changeStyle,
  changeLoginState,
  changeAlert,
});

export default rootReducer;
