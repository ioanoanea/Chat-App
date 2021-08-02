import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "../reducers/rootReducer";
import thunk from "redux-thunk";

export const appStore = createStore(rootReducer, applyMiddleware(thunk));
