import { gql } from "@apollo/client";

const GET_BRANDED_FOODS = gql`
  query brandedFoods($query: String!) {
    brandedFoods(query: $query) {
      edges {
        node {
          id
          name
          gtinUpc
          brandOwner
          servingSize
          servingSizeUnit
          brandedFoodCategory
          nutrients {
            type
            amount
            name
            unit
          }
        }
      }
    }
  }
`;

export default GET_BRANDED_FOODS;
