import React, { useContext } from 'react'
import { Routes , Route } from 'react-router-dom'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { UserDataContext } from './context/UserDataContext'

const App = () => {
  let { userdata } = useContext(UserDataContext); 
  return (
    <>
      {userdata && <Navbar />}
      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/signup' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        
      </Routes>  
    </>
  )
}

export default App