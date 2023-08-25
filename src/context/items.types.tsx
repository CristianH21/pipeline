export type StateType = {
    isLoading: boolean,
    items: {[key: string]: any}
}

export type ContextType = {
    state: StateType,
    dispatch: React.Dispatch<ItemActions>
}

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
      ? {
          type: Key;
        }
      : {
          type: Key;
          payload: M[Key];
        }
};

export enum Types {
    SET_ITEMS = "setItems",
    SET_ITEM = "setItem",
    SET_IS_LOADING = "setIsLoading",
    SET_REST = "setReset"
}

export type ItemPayload = {
    [Types.SET_IS_LOADING]: boolean;
    [Types.SET_ITEMS]: {[key: string]: any};
    [Types.SET_ITEM]: {
        item: any,
        containerId: string
    };
    [Types.SET_REST]: {
        isLoading: boolean,
        items: {}
    };
}

export type ItemActions = ActionMap<ItemPayload>[keyof ActionMap<ItemPayload>];

export type ItemReducerType<S, A> = (prevState: S, action: A) => S;