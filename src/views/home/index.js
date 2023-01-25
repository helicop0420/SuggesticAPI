import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  Input,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import './index.scss'
import {gql, useLazyQuery, useMutation, useQuery} from '@apollo/client';
import SEARCH_RECIPE_LIST from "../../querys/searchRecipeByNameOrIngredient";
import GET_RECIPE_ITEM from "../../querys/recipe";
import { result } from "validate.js";
import { Search } from '@mui/icons-material';



const HomePage = () => {
  const [searchRecipeList] = useLazyQuery(SEARCH_RECIPE_LIST);
  const [getRecipeItem] = useLazyQuery(GET_RECIPE_ITEM);
  const [searchKey, setSearchKey] = useState('')
  const [recipeList, setRecipeList] = useState([])
  const [detail, setDetail] = useState({})
  console.log('renderind=========')

  const handleSubmit = async() => {
    let res = await searchRecipeList({variables: { query: searchKey }})
    let result = res.data.searchRecipeByNameOrIngredient.onPlan
    console.log('res', result)
    setDetail({})
    setRecipeList(result)
  }

  const handleClick = async(id) => {
    console.log('id, ', id)
    let res = await getRecipeItem({variables: { id: id }})
    let item = res.data.recipe
    setDetail(item)
    console.log('res item', res)
    setRecipeList([])
  }

  const ResultItem = ({content}) => (
      <div className="search-result-item" onClick={() => {handleClick(content.id)}}>
          <span>name: </span>{content.name}&nbsp;&nbsp;<span>author: </span>{content.author}&nbsp;&nbsp;<span>servingWeight:</span>{content.servingWeight}
          <hr></hr>
      </div>
  )

  const DetailInfo = ({info, name}) => (
    <div className="detail-info">
        <h3>{name}</h3>
        <div className="detail-info-item">calories: {info.calories}</div> 
        <div className="detail-info-item">protein: {info.protein}</div> 
        <div className="detail-info-item">carbs: {info.carbs}</div> 
        <div className="detail-info-item">fat: {info.fat}</div> 
        <div className="detail-info-item">sugar: {info.sugar}</div> 
        <div className="detail-info-item">fiber: {info.fiber}</div> 
        <div className="detail-info-item">saturatedFat: {info.saturatedFat}</div> 
        <div className="detail-info-item">monounsaturatedFat: {info.monounsaturatedFat}</div> 
        <div className="detail-info-item">polyunsaturatedFat: {info.polyunsaturatedFat}</div> 
        <div className="detail-info-item">transFat: {info.transFat}</div> 
        <div className="detail-info-item">copper: {info.copper}</div> 
        <div className="detail-info-item">cholesterol: {info.cholesterol}</div> 
        <div className="detail-info-item">choline: {info.choline}</div> 
        <div className="detail-info-item">iodine: {info.iodine}</div> 
        <div className="detail-info-item">magnesium: {info.magnesium}</div> 
        <div className="detail-info-item">manganese: {info.manganese}</div> 
        <div className="detail-info-item">molybdenum: {info.molybdenum}</div> 
        <div className="detail-info-item">phosphorus: {info.phosphorus}</div> 
        <div className="detail-info-item">potassium: {info.potassium}</div> 
        <div className="detail-info-item">selenium: {info.selenium}</div> 
        <div className="detail-info-item">sodium: {info.sodium}</div> 
        <div className="detail-info-item">zinc: {info.zinc}</div> 
        <div className="detail-info-item">sodium: {info.sodium}</div> 
        <div className="detail-info-item">potassium: {info.potassium}</div> 
        <div className="detail-info-item">vitaminB1: {info.vitaminB1}</div> 
        <div className="detail-info-item">vitaminB2: {info.vitaminB2}</div> 
        <div className="detail-info-item">vitaminB3: {info.vitaminB3}</div> 
        <div className="detail-info-item">vitaminB5: {info.vitaminB5}</div> 
        <div className="detail-info-item">vitaminB6: {info.vitaminB6}</div> 
        <div className="detail-info-item">vitaminB7: {info.vitaminB7}</div> 
        <div className="detail-info-item">vitaminB9: {info.vitaminB9}</div> 
        <div className="detail-info-item">vitaminA: {info.vitaminA}</div> 
        <div className="detail-info-item">vitaminC: {info.vitaminC}</div> 
        <div className="detail-info-item">calcium: {info.calcium}</div> 
        <div className="detail-info-item">iron: {info.iron}</div> 
        <div className="detail-info-item">netcarbs: {info.netcarbs}</div> 
    </div>
  )

  return (
    <Container className="main-block">
      <img src="/Ahara_logo.jpg" style={{width:'400px', height:'200px'}}></img>
      <div className="search-field">
        <Input type="text" value={searchKey} onChange={(e) => {setSearchKey(e.target.value)}}></Input>
        <Button onClick={handleSubmit}><Search></Search>Submit</Button>
      </div>     
      <div className="search-result">
        {recipeList.map(item => <ResultItem key={item.id} content={item} />)}
        {Object.keys(detail).length > 0 && (
          <DetailInfo info={detail.nutritionalInfo} name={detail.name}/>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
