import {
  Button,
  Input,
} from "@mui/material";
import React, { useState } from "react";
import './index.scss'
import {useLazyQuery} from '@apollo/client';
import SEARCH_RECIPE_LIST from "../../querys/searchRecipeByNameOrIngredient";
import GET_RECIPE_ITEM from "../../querys/recipe";
import { Search } from '@mui/icons-material';

const RecipeTab = () => {
  const [searchRecipeList] = useLazyQuery(SEARCH_RECIPE_LIST);
  const [getRecipeItem] = useLazyQuery(GET_RECIPE_ITEM);
  const [searchKey, setSearchKey] = useState('')
  const [recipeList, setRecipeList] = useState([])
  const [detail, setDetail] = useState({})

  const handleSubmit = async() => {
    let res = await searchRecipeList({variables: { query: searchKey }})
    let result = res.data.searchRecipeByNameOrIngredient.onPlan
    setDetail({})
    setRecipeList(result)
  }

  const handleClick = async(id) => {
    console.log('id, ', id)
    let res = await getRecipeItem({variables: { id: id }})
    let item = res.data.recipe
    setDetail(item)
    setRecipeList([])
  }

  const ResultItem = ({content}) => (
      <tr className="search-result-item" onClick={() => {handleClick(content.id)}}>
          <td><span style={{color:'blue'}}>{content.name}</span></td>
          <td>{content.author}</td>
          <td>{content.servingWeight}</td>
          <td>{content.ingredients.map((item,idx)=>(<span key={"rep-ing"+idx}>{item.name} </span>))}</td>
          <td>{content.ingredientLines.map((item,idx)=>(<div key={"rep-ingline"+idx}>{item}</div>))}</td>
      </tr>
  )

  const DetailInfo = ({info, name}) => (
    <div className="detail-info">
        <h3>{name}</h3>
        <table className="result-table w-60">
          <thead>
            <th>name</th>
            <th>amount</th>
          </thead>
          
          <tr><td>calories</td><td>{info.calories}Kcal</td></tr> 
          <tr><td>protein</td><td>{info.protein}g</td></tr> 
          <tr><td>carbs</td><td>{info.carbs}g</td></tr> 
          <tr><td>fat</td><td>{info.fat}g</td></tr> 
          <tr><td>sugar</td><td>{info.sugar}g</td></tr> 
          <tr><td>fiber</td><td>{info.fiber}g</td></tr> 
          <tr><td>saturatedFat</td><td>{info.saturatedFat}g</td></tr> 
          <tr><td>monounsaturatedFat</td><td>{info.monounsaturatedFat}g</td></tr> 
          <tr><td>polyunsaturatedFat</td><td>{info.polyunsaturatedFat}g</td></tr> 
          <tr><td>transFat</td><td>{info.transFat}g</td></tr> 
          <tr><td>copper</td><td>{info.copper}mg</td></tr> 
          <tr><td>cholesterol</td><td>{info.cholesterol}mg</td></tr> 
          <tr><td>choline</td><td>{info.choline}mg</td></tr> 
          <tr><td>iodine</td><td>{info.iodine}ug</td></tr> 
          <tr><td>magnesium</td><td>{info.magnesium}mg</td></tr> 
          <tr><td>manganese</td><td>{info.manganese}mg</td></tr> 
          <tr><td>molybdenum</td><td>{info.molybdenum}ug</td></tr> 
          <tr><td>phosphorus</td><td>{info.phosphorus}mg</td></tr> 
          <tr><td>potassium</td><td>{info.potassium}mg</td></tr> 
          <tr><td>selenium</td><td>{info.selenium}ug</td></tr> 
          <tr><td>sodium</td><td>{info.sodium}mg</td></tr> 
          <tr><td>zinc</td><td>{info.zinc}mg</td></tr> 
          <tr><td>sodium</td><td>{info.sodium}mg</td></tr> 
          <tr><td>vitaminB1</td><td>{info.vitaminB1}mg</td></tr> 
          <tr><td>vitaminB2</td><td>{info.vitaminB2}mg</td></tr> 
          <tr><td>vitaminB3</td><td>{info.vitaminB3}mg</td></tr> 
          <tr><td>vitaminB5</td><td>{info.vitaminB5}mg</td></tr> 
          <tr><td>vitaminB6</td><td>{info.vitaminB6}mg</td></tr> 
          <tr><td>vitaminB7</td><td>{info.vitaminB7}ug</td></tr> 
          <tr><td>vitaminB9</td><td>{info.vitaminB9}ug</td></tr> 
          <tr><td>vitaminA</td><td>{info.vitaminA}IU</td></tr> 
          <tr><td>vitaminC</td><td>{info.vitaminC}mg</td></tr> 
          <tr><td>calcium</td><td>{info.calcium}mg</td></tr> 
          <tr><td>iron</td><td>{info.iron}mg</td></tr> 
          <tr><td>netcarbs</td><td>{info.netcarbs}g</td></tr> 
        </table>
    </div>
  )

  return (
    <div className="main-block">
      <div className="search-field">
        <Input type="text" value={searchKey} onChange={(e) => {setSearchKey(e.target.value)}}></Input>
        <Button onClick={handleSubmit}><Search></Search>Submit</Button>
      </div>     
      <div className="search-result">
        {recipeList.length > 0 && (
          <table className="result-table">
            <thead>
              <tr>
                <th>name</th>
                <th>author</th>
                <th>servingWeight</th>
                <th>ingredients</th>
                <th>preparation</th>
              </tr>
            </thead>
            <tbody>
              {recipeList.map((item,index) => (
                  <ResultItem key={"recipe"+index} content={item} />
                )
              )}
            </tbody>
          </table>
        )}
        {Object.keys(detail).length > 0 && (
          <DetailInfo info={detail.nutritionalInfo} name={detail.name}/>
        )}
      </div>
    </div>
  );
};

export default RecipeTab;
