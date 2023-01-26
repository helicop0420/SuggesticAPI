import {
  Button,
  Input,
} from "@mui/material";
import React, { useState } from "react";
import './index.scss'
import {useLazyQuery} from '@apollo/client';
import GET_BRANDED_FOODS from "../../querys/brandedFoods";
import { Search } from '@mui/icons-material';

const BrandTab = () => {
  const [getBrandedFoods] = useLazyQuery(GET_BRANDED_FOODS);
  const [searchKey, setSearchKey] = useState('')
  const [recipeList, setRecipeList] = useState([])
  const [detail, setDetail] = useState({})

  const handleSubmit = async() => {
    let res = await getBrandedFoods({variables: { query: searchKey }})
    let result = res.data.brandedFoods.edges
    setDetail({})
    setRecipeList(result)
  }

  const ResultItem = ({content}) => (
      <tr className="search-result-item">
          <td><span>{content.name}</span></td>
          <td>{content.nutrients.map((item,idx)=>(<div key={"brand-nut"+idx}>{item.name} {item.amount}{item.unit}</div>))}</td>
          <td>{content.brandOwner}</td>
          <td>{content.brandedFoodCategory}</td>
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
                <th>brandOwner</th>
                <th>brandedFoodCategory</th>
              </tr>
            </thead>
            <tbody>
              {recipeList.map((item,index) => (
                  <ResultItem key={"brand"+index} content={item.node} />
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BrandTab;
