import React from 'react'
import { Router, Routes, Route, } from "react-router-dom";
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Authpage from './components/API/Authpage';
import Addminpanel from './components/addminpanel';
import Cart from './components/Cart'
import Productdetail from './components/Productdetail';
import Verify from './components/Verify';
import Popup from './components/Popup';
import Adress from './components/Adress';
import Finalorder from './components/Finalorder';

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Authpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/owners/admin" element={<Addminpanel />} />
          <Route path="/addtocart" element={<Cart />} />
          <Route path="/detail" element={<Productdetail />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/popup" element={<Popup />} />
          <Route path="/address" element={<Adress />} />
          <Route path="/finalorder" element={<Finalorder />} />
        </Routes>
      
    </div>
  )
}

export default App
