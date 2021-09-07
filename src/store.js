import { createStore } from "redux";
import rootReducer from "./reducers/index";

// Development
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Production
// const store = createStore(rootReducer);

export default store;
