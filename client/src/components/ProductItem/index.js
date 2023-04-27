import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import "./style.css";

// import bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProductItem(item) {

  
  const [state, dispatch] = useStoreContext();

  const { cart } = state;

  const addToCart = () => {
    
    // find the cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    // if there was a match, call UPDATE with a new purchase quantity
    if (itemInCart) {
        dispatch({
            type: UPDATE_CART_QUANTITY, 
            _id: _id, 
            purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
        });

        idbPromise("cart", "put", {
          ...itemInCart, 
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
        });
    } else {
        dispatch({
            type: ADD_TO_CART, 
            product: { ...item, purchaseQuantity: 1}
        });

        idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  return (
      <Card className="productCard" style={{ width: "20rem" }}>
        <Card.Body>
        <Link to={`/products/${_id}`}>
          <Card.Img className="cardImage" variant="top"
            src={`/images/${image}`}
            alt=""
          />
          <Card.Title>{name}</Card.Title>
        </Link>
          <Card.Text>{quantity} {pluralize("item", quantity)} in stock</Card.Text>
          <Card.Text>${price}</Card.Text>
          <Button onClick={addToCart} variant="primary">Add to cart</Button>
        </Card.Body>
      </Card>
  );
}

export default ProductItem;