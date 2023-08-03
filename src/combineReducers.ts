import { Action, Reducer } from "./configureStore";

export const combineReducers = (
  reducers?: Record<string, Reducer<any, Action>>,
) => {
  // root reducer
  return (initialState?: { [x: string]: any }, action?: Action) => {
    let state = {};
    for (const [key, reducer] of Object.entries(reducers)) {
      state[key] = reducer(initialState?.[key], action);
    }
    return state;
  };
};
