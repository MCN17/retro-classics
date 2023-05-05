import React, { useEffect } from "react";
import Auth from "../../utils/auth";
import "./style.css";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { QUERY_CHECKOUT } from  "../../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from  "@apollo/client";

//import components
import CartItem from '../CartItem';

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");



const Cart = () => {

    const [state, dispatch] = useStoreContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise("cart", "get");
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart]});
        };

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    useEffect (() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }


    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function submitCheckout() {
        const productIds = [];

        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);
            }
        });

        getCheckout({
            variables: { products: productIds }
        });
    }

    if (!state.cartOpen) {
        return (
            <div className="cartClosed" onClick={toggleCart}>
                <span className="img" role="img" aria-label="cart">
                    🛒
                </span>
            </div>
        );
    };

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
                            <button onClick={submitCheckout}>Checkout</button>
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