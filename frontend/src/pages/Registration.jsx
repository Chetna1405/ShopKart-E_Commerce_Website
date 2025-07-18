import React, { useContext, useState } from 'react'
import shopkart from "../assets/shopkart.png";
import Google from "../assets/GOOGLE.png"
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { AuthDataContext } from '../context/AuthdataContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { UserDataContext } from '../context/UserDataContext';
const Registration = () => {
  let [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let { serverUrl } = useContext(AuthDataContext);
  let { getCurrentUser } = useContext(UserDataContext);
  let navigate = useNavigate()


  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(serverUrl + "/api/auth/registration", {
        name, email, password
      }, { withCredentials: true });
      // console.log(result.data);
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log("Error with Registration ", error);
    }
  }

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      // console.log(response);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      const result = await axios.post(serverUrl + "/api/auth/googlelogin", {
            name,
            email
          }, {
            withCredentials: true
          }
      )
      console.log(result.data);
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log("Error with Google Registration ", error);
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] 
                    flex flex-col items-center justify-start'>
      <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px]
                      cursor-pointer ' onClick={() => navigate('/')}>
        <img className='w-[40px]' src={shopkart} alt="" />
        <h1 className='text-[22px] font sans'>ShopKart</h1>
      </div>


      <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px] '>
        <span className='text-[25px] font-semibold'> Registration page</span>
        <span className='text-[16px] '> Welcome to ShopKart !! </span>
      </div>

      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] 
      backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
        <form action="" className='w-[90%] h-[90%] flex flex-col items-center
                          justify-start gap-[20px]'
          onSubmit={handleSignUp}
        >
          <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center
              justify-center gap-[10px] py-[20-px] cursor-pointer'  onClick={googleSignup}>
            <img src={Google} className='w-[50px]' alt="" />Registration with Google
          </div>

          <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
          </div>

          <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative' >
            <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] 
              backdrop:blur-sm rounded-lg shadow-lg bg-transparent
              placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='Username '
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

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


            {!show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]' onClick={() => setShow(prev => !prev)} />}
            {show && <IoEyeSharp className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]' onClick={() => setShow(prev => !prev)} />}
            <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex
            items-center justify-center mt-[20px] text-[17px] font-semibold'>Create Account</button>

            <p className='flex gap-[10px]'>You have any account ?
              <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer'
                onClick={() => navigate("/login")}>Login</span></p>

          </div>


        </form>

      </div>

    </div>
  )
}

export default Registration