import { reducer } from "../utils/reducers";

// import actions
import {
    UPDATE_PRODUCTS, 
    UPDATE_CONSOLES, 
    UPDATE_CURRENT_CONSOLE
} from "../utils/actions";

// create a sample of what global state will look like

const initialState = {
    products: [], 
    consoles: [{ name: "Playstation" }],
    currentConsole: "3",
}

test("UPDATE_PRODUCTS", () => {
    let newState = reducer(initialState, {
        type: UPDATE_PRODUCTS, 
        products: [{}, {}, {}]
    });

    expect(newState.products.length).toBe(3);
    expect(initialState.products.length).toBe(0);
})