
import React from "react";

import { BrowserRouter , Route, Routes } from "react-router-dom";
import Home from "./Crud App/Home";
import Update from "./Crud App/Update";
import Read from "./Crud App/Read";

function App() {
  
  return (
   
            <div className="App" style={{padding:10}}>
                  <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/update/:id" element={<Update/>} />
                        <Route path="/read/:id" element={<Read/>} />
                    </Routes>
                  </BrowserRouter>
            </div>
    
  );
}

export default App;
