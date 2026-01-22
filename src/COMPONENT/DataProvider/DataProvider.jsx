import React, { createContext, useReducer, useEffect } from "react";
import { Type } from "../../Utility/Action.type";
import { auth } from "../../Utility/Firebase"; // ← adjust path
import { onAuthStateChanged } from "firebase/auth"; // ← Firebase v9 modular

// ────────────────────────────────────────────────
export const DataContext = createContext();

// ────────────────────────────────────────────────
export const initialState = {
  basket: [],
  user: null,
};

// ────────────────────────────────────────────────
const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET: {
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id,
      );

      if (existingItem) {
        return {
          ...state,
          basket: state.basket.map((item) =>
            item.id === action.item.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item,
          ),
        };
      }

      return {
        ...state,
        basket: [...state.basket, { ...action.item, quantity: 1 }],
      };
    }

    case Type.INCREASE_QTY:
      return {
        ...state,
        basket: state.basket.map((item) =>
          item.id === action.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        ),
      };

    case Type.DECREASE_QTY:
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

    case Type.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.id),
      };

    case Type.CLEAR_BASKET:
      return {
        ...state,
        basket: [],
      };

    case Type.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

// ────────────────────────────────────────────────
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Listen to Firebase auth state changes (persists login across refreshes)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch({
        type: Type.SET_USER,
        payload: currentUser, // will be null when signed out
      });
    });

    // Cleanup subscription when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};
