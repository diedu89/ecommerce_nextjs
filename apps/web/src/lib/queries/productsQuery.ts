import { gql } from "@apollo/client";

export const productsQuery = gql`
  query products {
    products {
      items {
        title
        description
        price
        category
        image
        stock
        isActive
        id
      }
      total
      page
      size
      pages
    }
  }
`;
