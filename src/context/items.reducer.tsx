import React from "react";
import { ItemActions, StateType, Types } from "./items.types";

export function itemReducer(state: StateType, action: ItemActions) {
  switch(action.type) {
    case Types.SET_ITEMS: 
      return {
        ...state,
        items: action.payload
      }
    case Types.SET_ITEM:
      const { containerId, item} = action.payload;
      let insertItems;
      if (state.items[containerId].items.filter((i: any) => i.id === item.id).length >= 1) {
        insertItems = [...state.items[containerId].items.map((i: any) => i.id === item.id ? item : i)]
      } else {
        insertItems = [...state.items[containerId].items, item];
      }

      return {
        ...state,
        items: {
          ...state.items,
          [containerId]: {
            ...state.items[containerId],
            items: insertItems
          }
        }
      }
    case Types.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case Types.SET_REST:
      return {
        items: {},
        isLoading: false
      }
    default:
      return state;
  }
}

export function setItems(items: any): ItemActions {
  return {
    type: Types.SET_ITEMS,
    payload: items
  }
}

export function setItem(item: any, containerId: string): ItemActions {
  return {
    type: Types.SET_ITEM,
    payload: { item, containerId }
  }
}

export function useItemActions(
  reducer: any,
  mapDispatchToActions: any
) {
  const [, dispatch] = reducer;
  const actions = React.useMemo(() => mapDispatchToActions(dispatch), [dispatch])
  return actions;
}