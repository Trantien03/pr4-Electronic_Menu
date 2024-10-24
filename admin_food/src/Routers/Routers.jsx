import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AdminRoute from './AdminRoute'
import ChefRoute from "./ChefRoute";

const Routers = () => {
  return (
    <Routes>

        <Route path='/' element={<AdminRoute/>}/>
        <Route path='/' element={<ChefRoute/>}/>
    </Routes>
  )
}

export default Routers
