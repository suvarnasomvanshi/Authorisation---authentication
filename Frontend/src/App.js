
import React from "react";
import Header from "./component/Header";
import Signup from "./component/Signup";
import Welcome from "./component/Welcome";
import Login from "./component/Login"
import { Routes, Route } from "react-router-dom";




function App (){


  return (
    <>
      <header>
        <Header/>
      </header>

      <main>
        <Routes>
          <Route path= "/login" element={<Login/>}></Route>
          <Route path= "/signup" element={<Signup/>}></Route>
          <Route path= "/user" element={<Welcome/>}></Route>
        </Routes>
      </main>

      
    </>
  )
}

export default App;
