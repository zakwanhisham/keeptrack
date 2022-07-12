import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProjectState } from "./projects/state/projectTypes";
import {
  initialProjectState,
  projectReducer,
} from "./projects/state/projectReducer";

const reducer = combineReducers({
  projectState: projectReducer,
});

export default function configureStore(preloadedState: any) {
  const middlewares = [ReduxThunk];
  const middlewaresEnhancer = applyMiddleware(...middlewares);

  // Thunk i middleware
  // DevTools is an enhancer (actually changes Redux)
  // applyMiddleware wraps middleware and return an enhancer

  // to use only thunk middleware
  // const enhancer = compose(middlewareEnhancer);

  // to use thunk &devTools
  const enhancer = composeWithDevTools(middlewaresEnhancer);

  const store = createStore(reducer, preloadedState, enhancer);
  return store;
}

export interface AppState {
  projectState: ProjectState;
}
export const initialAppState: AppState = {
  projectState: initialProjectState,
};
export const store = configureStore(initialAppState);
