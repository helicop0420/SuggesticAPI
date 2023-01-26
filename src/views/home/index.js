import {
  Container,
} from "@mui/material";
import React, { useState } from "react";
import './index.scss'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RecipeTab from "../tabs/recipe";
import IngredientTab from "../tabs/ingredient";
import BrandTab from "../tabs/brandedFoods";


const HomePage = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container className="main-block">
      <img src="/Ahara_logo.jpg" alt="logo png" style={{width:'400px', height:'200px'}}></img>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Recipes" value="1" />
            <Tab label="Ingredients" value="2" />
            <Tab label="Branded Foods" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <RecipeTab />
        </TabPanel> 
        <TabPanel value="2">
          <IngredientTab />
        </TabPanel>
        <TabPanel value="3">
          <BrandTab />
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default HomePage;
