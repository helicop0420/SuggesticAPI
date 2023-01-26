import { gql } from "@apollo/client";

const GET_COMMON_FOODS = gql`
  query commonFoods($query: String!) {
    commonFoods(query: $query) {
      edges {
        node {
          id
          name
          description
          nutrients {
            type
            amount
            name
            unit
          }
          portions {
            amount
            gramWeight
            modifier
          }
        }
      }
    }
  }
`;

export default GET_COMMON_FOODS;
