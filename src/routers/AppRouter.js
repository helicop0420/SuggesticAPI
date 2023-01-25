import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import {HomePage} from '../views';

export const AppRouter = () => (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage/>} />
        </Routes>
    </Router> 

)