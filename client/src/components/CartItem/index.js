import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

// import bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


const CartItem = ({ item }) => {

    const [, dispatch] = useStoreContext();

    const removeFromCart = item => {
        dispatch({
            type: REMOVE_FROM_CART, 
            _id: item._id
        });

        idbPromise("cart", "delete", { ...item });
    };

    const onChange = (e) => {
        const value = e.target.value;

        if (value === "0") {
            dispatch({
                type: REMOVE_FROM_CART, 
                _id: item._id
            });

            idbPromise("cart", "delete", { ...item });
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY, 
                _id: item._id, 
                purchaseQuantity: parseInt(value)
            });

            idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
        }
    };


    return (
        <Card className="cartItem" style={{ width: "15rem" }}>
        <Card.Body className="cartOpen">
                <Card.Img className="cartImage" variant="top"
                    src={`/images/${item.image}`}
                    alt=""
                />
            <div>
                <div>{item.name}, ${item.price}</div>
                <div>
                    <span>Qty:</span>
                    <input
                        type="number"
                        placeholder="1"
                        value={item.purchaseQuantity}
                        onChange={onChange}
                    />
                    <button onClick={() => removeFromCart(item)}>Remove Item</button>
                </div>
            </div>
        </Card.Body>
        </Card>
    );
}

export default CartItem;