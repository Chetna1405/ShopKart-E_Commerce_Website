import React, { useContext } from 'react'
import { Routes , Route, useLocation, Navigate } from 'react-router-dom'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { UserDataContext } from './context/UserDataContext'
import About from './pages/About'
import Collections from './pages/Collections'
import Product from './pages/Product'
import Contact from './pages/Contact'
import Orders from './pages/Orders'

const App = () => {
  let { userdata } = useContext(UserDataContext); 
  let location = useLocation();

  return (
    <>
      {userdata && <Navbar />}
      <Routes>
        <Route path='/login'
          element={
            userdata ? (<Navigate to={location.state?.from || "/"} />)
                    : (<Login />)
          } />
        
        <Route path='/signup'
          element={
            userdata ? (<Navigate to={location.state?.from || "/"} />)
              : (<Registration />)
          } />
        
        <Route path='/'
          element={userdata ? <Home /> : <Navigate to="/login" state={{ from: location.pathname }} />}
        />
        
        <Route path='/about'
          element={userdata ? <About /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
        <Route path='/collection'
          element={userdata ? <Collections /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
        
        <Route path='/product'
          element={userdata ? <Product /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
        
        <Route path='/contact'
          element={userdata ? <Contact /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
        
        <Route path='/orders'
          element={userdata ? <Orders /> : <Navigate to="/login" state={{ from: location.pathname }} />} />
        
        

      </Routes>  
    </>
  )
}

export default App