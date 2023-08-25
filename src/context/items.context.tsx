import React from "react";
import { itemReducer, useItemActions } from "./items.reducer";
import { ContextType, ItemActions, StateType, Types } from "./items.types";

const initialState = {
    isLoading: false,
    items: {}
}

const ItemContext = React.createContext<ContextType>({
    state: initialState,
    dispatch: () => null
});

const ItemProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [state, dispatch] = React.useReducer(itemReducer, initialState);
    
    return (
        <ItemContext.Provider value={{state, dispatch}}>
            {children}
        </ItemContext.Provider>
    )
}

const useItemContext = (): [state: StateType, dispatch: React.Dispatch<ItemActions>] => {
    const {state, dispatch} = React.useContext(ItemContext);
    return [state, dispatch];
}

export {
    ItemProvider,
    useItemContext
}