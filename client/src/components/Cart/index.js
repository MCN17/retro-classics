import React from "react";
import Auth from "../../utils/auth";

const Cart = () => {
    return (
        <div>
            <div>Close</div>
            <h3>Shopping Cart</h3>
            <div>
                Cart Items
                <div>
                    <h4>Total:</h4>
                    {
                        Auth.loggedIn() ?
                        <button>Checkout</button> :
                        <h4>Login to checkout!</h4>
                    }
                </div>
            </div>
        </div>
    );
};

export default Cart;