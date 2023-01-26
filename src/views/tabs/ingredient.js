import {
  Button,
  Input,
} from "@mui/material";
import React, { useState } from "react";
import './index.scss'
import {useLazyQuery} from '@apollo/client';
import GET_COMMON_FOODS from "../../querys/commonFoods";
import { Search } from '@mui/icons-material';

const IngredientTab = () => {
  const [getCommonFoods] = useLazyQuery(GET_COMMON_FOODS);
  const [searchKey, setSearchKey] = useState('')
  const [recipeList, setRecipeList] = useState([])
  const [detail, setDetail] = useState({})

  const handleSubmit = async() => {
    let res = await getCommonFoods({variables: { query: searchKey }})
    let result = res.data.commonFoods.edges
    setDetail({})
    setRecipeList(result)
  }

  const ResultItem = ({content}) => (
      <tr className="search-result-item">
          <td><span>{content.name}</span></td>
          <td>{content.nutrients.map((item,idx)=>(<div key={"ing-nut"+idx}>{item.name} {item.amount}{item.unit}</div>))}</td>
          <td>{content.portions.map((item,idx)=>(<div key={"ing-por"+idx}>{item.modifier}</div>))}</td>
          <td>{content.description}</td>
      </tr>
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
                <th>nutrients</th>
                <th>portions</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              {recipeList.map((item,index) => (
                  <ResultItem key={"ingredient"+index} content={item.node} />
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default IngredientTab;
