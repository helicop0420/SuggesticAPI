import { gql } from "@apollo/client";

const SEARCH_RECIPE_LIST = gql`
  query searchRecipeByNameOrIngredient($query: String!) {
    searchRecipeByNameOrIngredient(query: $query) {
        onPlan {
          id
          name
          servingWeight
          author
        }
        otherResults {
          id
          name
          servingWeight
          author
        }
    }
  }
`;

export default SEARCH_RECIPE_LIST;
