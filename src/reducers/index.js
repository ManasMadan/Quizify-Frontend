import changeTheme from "./darkThemeReducers";
import changeStyle from "./styleReducers";
import changeLoginState from "./loginReducers";
import changeAlert from "./alertReducers";
import changeLoading from "./loadingReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  changeTheme,
  changeStyle,
  changeLoginState,
  changeAlert,
  changeLoading,
});

export default rootReducer;
