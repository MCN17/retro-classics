import { reducer } from "../utils/reducers";

// import actions
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
} from "../utils/actions";

// create a sample of what global state will look like

const initialState = {
    products: [], 
    consoles: [{ name: "Playstation 2" }],
    currentConsole: "3",
    cart: [
        {
            _id: "0", 
            name: "Tekken Tag Tournament",
            purchaseQuantity: 1
        },
        {
            _id: "1",
            name: "Grand Theft Auto: San Andreas",
            purchaseQuantity: 2
        }
    ],
    cartOpen: false
};

test("UPDATE_PRODUCTS", () => {
    let newState = reducer(initialState, {
        type: UPDATE_PRODUCTS, 
        products: [{}, {}, {}]
    });

    expect(newState.products.length).toBe(3);
    expect(initialState.products.length).toBe(0);
});

test("UPDATE_CONSOLES", () => {
    let newState = reducer(initialState, {
        type: UPDATE_CONSOLES, 
        consoles: [{}, {}]
    })

    expect(newState.consoles.length).toBe(2);
    expect(initialState.consoles.length).toBe(1);
});

test('UPDATE_CURRENT_CONSOLE', () => {
    let newState = reducer(initialState, {
      type: UPDATE_CURRENT_CONSOLE,
      currentConsole: "2"
    });
  
    expect(newState.currentConsole).toBe("2");
    expect(initialState.currentConsole).toBe("3");
  });

  test("ADD_TO_CART", () => {
    let newState = reducer(initialState, {
        type: ADD_TO_CART, 
        product: { purchaseQuantity: 1 }
    });

    expect(newState.cart.length).toBe(3);
    expect(initialState.cart.length).toBe(2);
  });

  test("ADD_MULTIPLE_TO_CART", () => {
    let newState = reducer(initialState, {
        type: ADD_MULTIPLE_TO_CART, 
        products: [{}, {}]
    });

    expect(newState.cart.length).toBe(4);
    expect(initialState.cart.length).toBe(2);
  });





