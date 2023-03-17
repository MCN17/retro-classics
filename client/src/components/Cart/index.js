import React from "react";
import Auth from "../../utils/auth";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART } from "../../utils/actions";

//import components
import CartItem from '../CartItem';

const Cart = () => {

    const [state, dispatch] = useStoreContext();

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    if (!state.cartOpen) {
        return (
            <div className="cartClosed" onClick={toggleCart}>
                Shopping Cart
            </div>
        );
    };

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    return (
        <div className="cart">
            <div className="closeCart" onClick={toggleCart}>Close</div>
            <h3>Shopping Cart</h3>
            {state.cart.length ? (
                <div>
                    {state.cart.map(item => (
                        <CartItem key={item._id} item={item} />
                    ))}
                    <div>
                        Total: ${calculateTotal()}
                        {
                            Auth.loggedIn() ?
                            <button>Checkout</button>
                            :
                            <span>Log in to checkout</span>
                        }
                    </div>
                </div>
            ) : (
                <h3>Your cart is empty!</h3>
            )}
        </div>
    )
 }

export default Cart;