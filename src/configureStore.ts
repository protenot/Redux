export type Store<State = any, Action = { type: string }> = {
  getState(): State;
  dispatch(action: Action): any;
  subscribe(cb: () => void): () => void;
  replaceReducer(newReducer: Reducer<State, Action>): void;
};

export type Action = {
  type: string;
  payload: any;
};

export type Reducer<State, Action> = (
  state: State | undefined,
  action: Action,
) => State;

export type Middleware<State, Action> = (
  store: Store<State, Action>,
) => (next: (action: Action) => any) => (action: Action) => any;

export type ConfigureStore<State, Action> = (
  reducer: Reducer<State, Action>,
  initialState?: State | undefined,
  middlewares?: Middleware<State, Action>[],
) => Store<State, Action>;
export function configureStore<State>(
  reducer: Reducer<State, Action>,
  initialState?: State,
): Store {
  let state = initialState as State;
  let cbs: Set<Function> = new Set();
  return {
    getState(): State {
      return state;
    },
    dispatch(action: Action): void {
      state = reducer(state, action);
      for (const cb of cbs) {
        cb(state);
      }
    },
    subscribe(cb: (state: State) => void): () => void {
      cbs.add(cb);

      return () => {
        cbs.delete(cb);
      };
    },
    replaceReducer(newReducer: Reducer<State, Action>): void {
      reducer = newReducer;
    },
  };
}
