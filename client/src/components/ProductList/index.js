import React from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';


function ProductList({ currentConsole }) {
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const products = data?.products || [];

  function filterProducts() {
    if (!currentConsole) {
      return products;
    }

    return products.filter(
      (product) => product.console._id === currentConsole
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
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