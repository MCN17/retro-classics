import { useReducer } from "react";

import {
    UPDATE_PRODUCTS, 
    UPDATE_CONSOLES, 
    UPDATE_CURRENT_CONSOLE,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        // if action type value is the value of "UPDATE_PRODUCTS", return a new state object with an udated products array
        case UPDATE_PRODUCTS:
            return {
                ...state, 
                products: [...action.products], 
            };

            // if action type is the value of "UPDATE_CONSOLES", return a new state object with an updated categories array
            case UPDATE_CONSOLES:
                return {
                    ...state, 
                    consoles: [...action.consoles]
                };

                case UPDATE_CURRENT_CONSOLE:
                    return {
                        ...state, 
                        currentConsole: action.currentConsole
                    };

                    case ADD_TO_CART:
                        return {
                            ...state, 
                            cartOpen: true, 
                            cart: [...state.cart, action.product]
                        };

                    case ADD_MULTIPLE_TO_CART:
                        return {
                            ...state, 
                            cart: [...state.cart, ...action.products],
                        };

                    case REMOVE_FROM_CART:
                        let newState = state.cart.filter(product => {
                            return product._id !== action._id;
                        });

                        return {
                            ...state, 
                            cartOpen: newState.length > 0, 
                            cart: newState
                        };

                    case UPDATE_CART_QUANTITY:
                        return {
                            ...state,
                            cartOpen: true,
                            cart: state.cart.map(product => {
                                if (action._id === product._id) {
                                  product.purchaseQuantity = action.purchaseQuantity;
                                }
                                return product;
                              })
                            };

                    case CLEAR_CART:
                        return {
                            ...state,
                            cartOpen: false,
                            cart: []
                            }; 
                            
                    case TOGGLE_CART:
                        return {
                            ...state,
                            cartOpen: !state.cartOpen
                            };

            // if it's none of these actions, do not update state at all and keep things the same
            default:
                return state;
    }
};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}