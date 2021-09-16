import changeTheme from "./darkThemeReducers";
import changeStyle from "./styleReducers";
import changeLoginState from "./loginReducers";
import changeAlert from "./alertReducers";
import changeLoadingState from "./loadingReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  changeTheme,
  changeStyle,
  changeLoginState,
  changeAlert,
  changeLoadingState,
});

export default rootReducer;
