import { useReducer } from "react";

import {
    UPDATE_PRODUCTS, 
    UPDATE_CONSOLES, 
    UPDATE_CURRENT_CONSOLE
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

            // if it's none of these actions, do not update state at all and keep things the same
            default:
                return state;
    }
};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}