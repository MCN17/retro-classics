import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';


function ProductList() {
  const [state, dispatch] = useStoreContext();
  const { currentConsole } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // const products = data?.products || [];

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS, 
        products: data.products
      });

      // take each product and save it to IndexedDB using the helper function
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });

      // check if "loading" is undefined in useQuery() hook

    } else if (!loading) {
      // since it's offline, get all of the data from the "products" store
      idbPromise("products", "get").then((products) => {
        // use retreived data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS, 
          products: products
        });
      });
    }
  }, [data, loading, dispatch]);

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