import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Orders from './pages/Orders'
import Addproduct from './pages/Addproduct'
import Lists from './pages/Lists'
import { AdminDataContext } from './context/AdminDataContext'

const App = () => {
  let {adminData} = useContext(AdminDataContext)
  return (
    <>
      {!adminData ? <Login /> :
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/lists' element={<Lists />} />
        <Route path='/add' element={<Addproduct />} />

        </Routes>
      }
    </>
  )
}

export default App