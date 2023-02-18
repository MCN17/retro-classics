import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"

function ProductItem(item) {
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  return (
    <div>
      <Link to={`/products/${_id}`}>
        <img
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button>Add to cart</button>
    </div>
  );
}

export default ProductItem;