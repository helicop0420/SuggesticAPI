import {
  Button,
  Container,
  Input,
} from "@mui/material";
import React, { useState } from "react";
import './index.scss'
import {useLazyQuery} from '@apollo/client';
import SEARCH_RECIPE_LIST from "../../querys/searchRecipeByNameOrIngredient";
import GET_RECIPE_ITEM from "../../querys/recipe";
import { Search } from '@mui/icons-material';

const HomePage = () => {
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
          <td>{content.ingredients.map(item=>(<span>{item.name} </span>))}</td>
          <td>{content.ingredientLines.map(item=>(<div>{item}</div>))}</td>
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
          
          <tr><td>calories</td><td>{info.calories}</td></tr> 
          <tr><td>protein</td><td>{info.protein}</td></tr> 
          <tr><td>carbs</td><td>{info.carbs}</td></tr> 
          <tr><td>fat</td><td>{info.fat}</td></tr> 
          <tr><td>sugar</td><td>{info.sugar}</td></tr> 
          <tr><td>fiber</td><td>{info.fiber}</td></tr> 
          <tr><td>saturatedFat</td><td>{info.saturatedFat}</td></tr> 
          <tr><td>monounsaturatedFat</td><td>{info.monounsaturatedFat}</td></tr> 
          <tr><td>polyunsaturatedFat</td><td>{info.polyunsaturatedFat}</td></tr> 
          <tr><td>transFat</td><td>{info.transFat}</td></tr> 
          <tr><td>copper</td><td>{info.copper}</td></tr> 
          <tr><td>cholesterol</td><td>{info.cholesterol}</td></tr> 
          <tr><td>choline</td><td>{info.choline}</td></tr> 
          <tr><td>iodine</td><td>{info.iodine}</td></tr> 
          <tr><td>magnesium</td><td>{info.magnesium}</td></tr> 
          <tr><td>manganese</td><td>{info.manganese}</td></tr> 
          <tr><td>molybdenum</td><td>{info.molybdenum}</td></tr> 
          <tr><td>phosphorus</td><td>{info.phosphorus}</td></tr> 
          <tr><td>potassium</td><td>{info.potassium}</td></tr> 
          <tr><td>selenium</td><td>{info.selenium}</td></tr> 
          <tr><td>sodium</td><td>{info.sodium}</td></tr> 
          <tr><td>zinc</td><td>{info.zinc}</td></tr> 
          <tr><td>sodium</td><td>{info.sodium}</td></tr> 
          <tr><td>potassium</td><td>{info.potassium}</td></tr> 
          <tr><td>vitaminB1</td><td>{info.vitaminB1}</td></tr> 
          <tr><td>vitaminB2</td><td>{info.vitaminB2}</td></tr> 
          <tr><td>vitaminB3</td><td>{info.vitaminB3}</td></tr> 
          <tr><td>vitaminB5</td><td>{info.vitaminB5}</td></tr> 
          <tr><td>vitaminB6</td><td>{info.vitaminB6}</td></tr> 
          <tr><td>vitaminB7</td><td>{info.vitaminB7}</td></tr> 
          <tr><td>vitaminB9</td><td>{info.vitaminB9}</td></tr> 
          <tr><td>vitaminA</td><td>{info.vitaminA}</td></tr> 
          <tr><td>vitaminC</td><td>{info.vitaminC}</td></tr> 
          <tr><td>calcium</td><td>{info.calcium}</td></tr> 
          <tr><td>iron</td><td>{info.iron}</td></tr> 
          <tr><td>netcarbs</td><td>{info.netcarbs}</td></tr> 
        </table>
    </div>
  )

  return (
    <Container className="main-block">
      <img src="/Ahara_logo.jpg" alt="logo png" style={{width:'400px', height:'200px'}}></img>
      <div className="search-field">
        <Input type="text" value={searchKey} onChange={(e) => {setSearchKey(e.target.value)}}></Input>
        <Button onClick={handleSubmit}><Search></Search>Submit</Button>
      </div>     
      <div className="search-result">
        {recipeList.length > 0 && (
          <table className="result-table">
            <thead>
              <th>name</th>
              <th>author</th>
              <th>servingWeight</th>
              <th>ingredients</th>
              <th>preparation</th>
            </thead>
            {recipeList.map((item,index) => (
                <ResultItem key={"result"+index} content={item} />
              )
            )}
          </table>
        )}
        {Object.keys(detail).length > 0 && (
          <DetailInfo info={detail.nutritionalInfo} name={detail.name}/>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
