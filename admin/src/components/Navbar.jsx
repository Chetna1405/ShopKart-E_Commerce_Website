import React, { useContext  } from 'react'
import shopkart from "../assets/shopkart.png"
import { useNavigate } from 'react-router-dom'
import { AuthDataContext } from '../context/AuthDataContext';
import axios from "axios"
import { AdminDataContext } from '../context/AdminDataContext';
const Navbar = () => {
  let navigate = useNavigate();
  let { serverUrl } = useContext(AuthDataContext);
  let { getAdmin } = useContext(AdminDataContext);
  const logout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      console.log(result.data);
      getAdmin();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='w-[100vw] h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 flex items-center
                justify-between px-[30px] shadow-md shadow-black overflow-x-hidden'>
      <div className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer ' onClick={() => navigate("/")}>
        <img src={shopkart} className="w-[30px]" alt="" />
        <h1 className='text-[25px] text-[black] font-sans '>Shopkart</h1>

      </div>
      <button className='text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white '
          onClick={logout}>
        Logout
      </button>

    </div>
  )
}

export default Navbar