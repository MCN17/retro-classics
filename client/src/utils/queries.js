import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query getProducts($console: ID) {
    products(console: $console) {
      _id
      name
      description
      price
      quantity
      image
      console {
        _id
      }
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      console {
        name
      }
    }
  }
`;

export const QUERY_CONSOLES = gql`
  {
    consoles {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
query getCheckout($products: [ID]!) {
  checkout(products: $products) {
    session
  }
}
`;
