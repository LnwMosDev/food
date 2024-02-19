import React from 'react';
import ListFood from './ListFood';
import Nav from './Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutMe from './AboutMe';
import CRUD from './CRUD';


function App() {
  const serverName = "http://localhost:8080/apirestaurant/";

  return (
    <BrowserRouter>
      <Nav />
      <div className="container mx-auto px-6 py-8">
        <Routes>
          <Route index element={<ListFood serverName={serverName}/>} />
          <Route path="/AboutMe" element={<AboutMe />} />
          <Route path="/CRUD" element={<CRUD />} /> 
          
         
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
