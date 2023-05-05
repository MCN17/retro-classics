import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { idbPromise } from "../utils/helpers"

//import components
import Cart from "../components/Cart";

// import bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY, ADD_TO_CART, UPDATE_PRODUCTS } from "../utils/actions";

import { QUERY_PRODUCTS } from '../utils/queries';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  
  const [currentProduct, setCurrentProduct] = useState({})
  
  const { data, loading } = useQuery(QUERY_PRODUCTS);
  
  const { products, cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY, 
        _id: id, 
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });

      // if updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise("cart", "put", {
        ...itemInCart, 
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART, 
        product: { ...currentProduct, purchaseQuantity: 1 },
      });

      // if product isn't in the cart yet, add it to the current shopping cart in IndexedDB
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART, 
      _id: currentProduct._id
    });

    // upon removal from cart, delete the item from IndexedDB using the "currentProduct._id" to locate what to remove
    idbPromise("cart", "delete", { ...currentProduct });
  };
  
  useEffect(() => {

    // already in global store
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));

      // retreived from server
    } else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });

      // get cache from idb
    } else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS, 
          products: indexedProducts
        });
      })
    };
  }, [products, data, loading, dispatch, id]);

  return (
    <>
      {currentProduct ? (
        <Row className="justify-content-center">
          <Link to="/">← Back to Games</Link>
          <Col lg={3}>
            <Card className="mt-3">
            <Card.Body>
            <Card.Title>{currentProduct.name}</Card.Title>

            <Card.Text>{currentProduct.description}</Card.Text>

            <p>
              <strong>Price:</strong>${currentProduct.price}{' '}
              <Button className="me-1" onClick={addToCart}>Add to Cart</Button>
              <Button
              disabled={!cart.find(game => game._id === currentProduct._id)}
              onClick={removeFromCart}
              >Remove from Cart</Button>
            </p>

            <Card.Img
              src={`/images/${currentProduct.image}`}
              alt={currentProduct.name}
            />
            </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : null}
    </>
  );
}

export default Detail;