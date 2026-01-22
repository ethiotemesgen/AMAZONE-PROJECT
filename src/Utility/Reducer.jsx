import { Type } from "./Action.type";

export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET: {
      const itemExists = state.basket.find(
        (item) => item.id === action.item.id,
      );

      if (itemExists) {
        // Increase quantity of existing item
        return {
          ...state,
          basket: state.basket.map((item) =>
            item.id === action.item.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item,
          ),
        };
      }

      // Add new item with quantity 1
      return {
        ...state,
        basket: [...state.basket, { ...action.item, quantity: 1 }],
      };
    }

    case Type.INCREASE_QTY: {
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        ),
      };
    }

    case Type.DECREASE_QTY: {
      return {
        ...state,
        basket: state.basket
          .map((item) =>
            item.id === action.id
              ? { ...item, quantity: Math.max(0, (item.quantity || 1) - 1) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    }

    case Type.REMOVE_FROM_BASKET: {
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id),
      };
    }

    case Type.CLEAR_BASKET: {
      return {
        ...state,
        basket: [],
      };
    }

    case Type.SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

    default:
      return state;
  }
};
