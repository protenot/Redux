export type Store<State = any, Action = { type: string }> = {
  getState(): State;
  dispatch(action: Action): any;
  subscribe(cb: () => void): () => void;
  replaceReducer(newReducer: Reducer<State, Action>): void;
  // middlewares(): Middleware<State, Action>;
};

export type Action = {
  type: string;
  payload?: any;
};

export type Reducer<State, Action> = (
  state: State | undefined,
  action: Action | undefined,
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
  middlewares?: Middleware<State, Action>,
): Store {
  let state = initialState as State;
  let cbs: Set<Function> = new Set();
  // let middle :Set<Middleware<State, Action>[]> = new Set;
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

    /*  middlewares (state:State, action:Action){
        middlewares = new Set(newMiddlewares)
        for (let middleware of middlewares as Middleware<any, any>[]){    
            middleware=
            (store) => (next) => (action) => {
             console.log("dispatching", action);
         const result = next(action);
         console.log("next state", store.getState());
         
         //return result;
     
            }
             } 
   
    }*/
  };
}
export function applyMiddleware(
  store: Store,
  ...middlewares: Middleware<any, any>[]
) {
  let { dispatch } = store;
  middlewares.forEach((middleware) => {
    dispatch = middleware(store)(dispatch);
  });
  return { ...store, dispatch };
}
