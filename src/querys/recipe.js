import { gql } from "@apollo/client";

const GET_RECIPE_ITEM = gql`
  query recipe($id: ID!) {
    recipe(id: $id) {
        name
        nutritionalInfo {
            calories
            protein
            carbs
            fat
            sugar
            fiber
            saturatedFat
            monounsaturatedFat
            polyunsaturatedFat
            transFat
            copper
            cholesterol
            choline
            iodine
            magnesium
            manganese
            molybdenum
            phosphorus
            potassium
            selenium
            sodium
            zinc
            potassium
            vitaminB1
            vitaminB2
            vitaminB3
            vitaminB5
            vitaminB6
            vitaminB7
            vitaminB9
            vitaminA
            vitaminC
            calcium
            iron
            netcarbs
        }
    }
  }
`;

export default GET_RECIPE_ITEM;
