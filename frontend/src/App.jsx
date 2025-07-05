import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Home from './pages/Home'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/signup' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        
      </Routes>  
    </>
  )
}

export default App