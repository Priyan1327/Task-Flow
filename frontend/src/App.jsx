import React from 'react'
import Dash from './Pages/Dash.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (


        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/dash' element={<Dash/>}/>
            </Routes>
        </BrowserRouter>
    

  )
}

export default App;

