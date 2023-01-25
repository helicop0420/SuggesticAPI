import { gql } from "@apollo/client";

const SEARCH_RECIPE_LIST = gql`
  query searchRecipeByNameOrIngredient($query: String!) {
    searchRecipeByNameOrIngredient(query: $query) {
        onPlan {
          id
          name
          servingWeight
          author
          ingredients {
            name
          }
          ingredientLines
        }
        otherResults {
          id
          name
          servingWeight
          author
          ingredients {
            name
          }
          ingredientLines
        }
    }
  }
`;

export default SEARCH_RECIPE_LIST;
