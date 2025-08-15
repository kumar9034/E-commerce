import React from 'react'
import { Router, Routes, Route, } from "react-router-dom";
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Authpage from './components/API/Authpage';
import Addminpanel from './components/addminpanel';

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Authpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/owners/admin" element={<Addminpanel />} />
        </Routes>
      
    </div>
  )
}

export default App
