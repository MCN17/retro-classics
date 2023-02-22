import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';


function ProductList({ }) {
  const [state, dispatch] = useStoreContext();
  const { currentConsole } = state;
  const { data } = useQuery(QUERY_PRODUCTS);

  // const products = data?.products || [];

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS, 
        products: data.products
      });
    };
  }, [data, dispatch]);

  function filterProducts() {
    if (!currentConsole) {
      return state.products;
    }

    return state.products.filter(product => product.console._id === currentConsole);
  }

  return (
    <div>
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div>
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any games yet!</h3>
      )}
    </div>
  );
}

export default ProductList;