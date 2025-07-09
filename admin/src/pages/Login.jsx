import React, { useState, useContext } from 'react'
import { AuthDataContext } from '../context/AuthDataContext';
import shopkart from "../assets/shopkart.png";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AdminDataContext } from '../context/AdminDataContext';
const Login = () => {
  let [show, setShow] = useState(false);
  let {getAdmin } = useContext(AdminDataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let { serverUrl } = useContext(AuthDataContext);
  // let { getCurrentUser } = useContext(UserDataContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(serverUrl + "/api/auth/adminlogin", { email, password }, { withCredentials: true })
      console.log(result.data);
      getAdmin();
      navigate("/");
    } catch (error) {
      console.log("Error with Login ", error);
    }
  }


  let navigate = useNavigate()
  
    return (
      <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] 
                        flex flex-col items-center justify-start'>
        <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px]
                            cursor-pointer '>
          <img className='w-[40px]' src={shopkart} alt="" />
          <h1 className='text-[22px] font sans'>ShopKart</h1>
        </div>


        <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px] '>
          <span className='text-[25px] font-semibold'>Admin Login page</span>
          <span className='text-[16px] '> Welcome to ShopKart !! </span>
        </div>

        <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] 
          backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
          <form action="" className='w-[90%] h-[90%] flex flex-col items-center
                              justify-start gap-[20px]'
            onSubmit={handleLogin}
          >

            <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative' >


              <input type="email" className='w-[100%] h-[50px] border-[2px] border-[#96969635] 
                  backdrop:blur-sm rounded-lg shadow-lg bg-transparent
                  placeholder-[#ffffffc7] px-[20px] font-semibold'
                placeholder='Email '
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <input type={show ? "text" : "password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] 
                  backdrop:blur-sm rounded-lg shadow-lg bg-transparent
                  placeholder-[#ffffffc7] px-[20px] font-semibold'
                placeholder='Password '
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}

              />
              {!show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]' onClick={() => setShow(prev => !prev)} />}
              {show && <IoEyeSharp className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]' onClick={() => setShow(prev => !prev)} />}
              <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex
                items-center justify-center mt-[20px] text-[17px] font-semibold'>Login</button>


            </div>
          </form>
        </div>
      </div>
      )
}

export default Login