import React, { useContext, useState } from 'react'
import shopkart from "../assets/shopkart.png"
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { LuContact } from "react-icons/lu";
import { IoSearchCircleSharp } from "react-icons/io5";
import { MdOutlineHome } from "react-icons/md";
import { UserDataContext } from '../context/UserDataContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthDataContext } from '../context/AuthdataContext';


function Navbar() {
        let { userdata, getCurrentUser } = useContext(UserDataContext);
        let [showSearch, setShowSearch] = useState(false);
        let [showProfile, setShowProfile] = useState(false);
        let { serverUrl } = useContext(AuthDataContext);

        const handleLogout = async ()=> {
                try {
                        const result = await axios.get(serverUrl+"/api/auth/logout" , {withCredentials : true})
                        console.log(result.data);
                        getCurrentUser();
                } catch (error) {
                        console.log(error);
                }
        }

        const navigate = useNavigate();
        return (
        <div className="relative w-full">
                        {/* NAVBAR */}
                <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10  top-0 flex items-center
                justify-between px-[30px] shadow-md shadow-grey relative'>
                        {/* LOGO PORTION */}
                        <div className='w-[20%] lg:w[30%] flex items-center justify-start gap-[10px] cursor-pointer'>
                                <img src={shopkart} alt="" className='w-[30px] ' />
                                {/* <h1 className='text-[25px] text-[black] font-sans '>Shopkart</h1> */}
                        </div>
                        
                        {/* LIST PORTION  */}
                                <div className='w-[50%] lg:w[40%] hidden md:flex '>
                                <ul className='flex items-center justify-center gap-[19px] text-white '>
                                        <li className='text-[15px] hover:bg-slate-500 cursor-pointer 
                                bg-[#000000c9] py-[10px] px-[20px] rounded-2xl '>HOME</li>
                                        <li className='text-[15px] hover:bg-slate-500 cursor-pointer 
                                bg-[#000000c9] py-[10px] px-[20px] rounded-2xl '>COLLECTIONS</li>
                                        <li className='text-[15px] hover:bg-slate-500 cursor-pointer 
                                bg-[#000000c9] py-[10px] px-[20px] rounded-2xl '>ABOUT</li>
                                        <li className='text-[15px] hover:bg-slate-500 cursor-pointer 
                                bg-[#000000c9] py-[10px] px-[20px] rounded-2xl '>CONTACT</li>
                                </ul>
                        </div>

                        {/* ICONS PORTION */}
                        <div className='w-[30%] flex items-center justify-end gap-[20px] '>
                                {!showSearch && <IoSearchCircleOutline
                                        className='w-[38px] h-[38px] text-[#000000] cursor-pointer '
                                        onClick={() => setShowSearch(prev => !prev)}
                                />}
                                {showSearch && <IoSearchCircleSharp
                                        className='w-[39px] h-[39px] text-[#000000] cursor-pointer '
                                        onClick={() => setShowSearch(prev => !prev)}
                                />}

                                {!userdata && <FaCircleUser className='w-[29px] h-[29px] text-[#000000] cursor-pointer ' 
                                onClick={() => setShowProfile(prev => !prev)}/>}
                                {
                                        userdata &&
                                        <div className='w-[30px] h-[30px] bg-[#000000] text-[white] rounded-full flex items-center justify-center cursor-pointer '
                                                        onClick={() => setShowProfile(prev => !prev)}>
                                                {userdata?.name.toUpperCase().slice(0, 1)}
                                        </div>
                                }
                                <MdOutlineShoppingCart className='w-[30px] h-[30px] text-[#000000] cursor-pointer hidden md:block ' />
                                <p className='absolute w-[18px] h-[18px] items-center justify-center bg-black px-[5px] py-[2px] 
                                text-white rounded-full text-[9px] top-[10px] right-[23px] hidden md:block'>10</p>
                        </div>
                        
                </div>

                {/* Search bar */}
                <div className={`w-full h-[80px] bg-[#d8f6f9dd] absolute top-full left-0 right-0 flex items-center justify-center 
                transition-transform duration-700 ease-in-out 
                ${showSearch ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                <input
                        type="text"
                        className='w-1/2 h-[60%] bg-[#233533] rounded-full px-[50px] placeholder:text-white text-white text-[18px]'
                        placeholder='Search here ...'
                />
                </div>
                        

                {/* Profile section Pop-up */}
                {showProfile && <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] 
                        border-[1px] border-[#aaa9a9] rounded-[10px] z-10 '>
                        <ul className='w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] text-[white] '>
                                {!userdata && <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer ' 
                                onClick={() => {
                                        navigate('/login')
                                        setShowProfile(false);
                                }}>Login</li>}
                                
                                {userdata && <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer '
                                onClick={() => {
                                        handleLogout() 
                                        setShowProfile(false);
                                }}>Logout</li>}
                                <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer '>Orders</li>
                                <li className='w-[100%] hover:bg-[#2f2f2f] hover:rounded-b-lg  px-[15px] py-[10px] cursor-pointer '>About</li>
                        </ul>
                        </div>}

                {/* Bottom for small devices */}
                        <div className='w-[100vw] h-[90px] flex items-center justify-between px-[20px] fixed bottom-0 left-0 bg-[#191818] md:hidden '>
                                <button className='text-[white] flex items-center justify-center flex-col gap-[2px] '>
                                        <MdOutlineHome className='w-[32px] h-[32px] text-white md:hidden ' />Home</button>
                                <button className='text-[white] flex items-center justify-center flex-col gap-[2px] '>
                                        <MdOutlineCollectionsBookmark className='w-[30px] h-[30px] text-white md:hidden ' />Collections</button>
                                <button className='text-[white] flex items-center justify-center flex-col gap-[2px] '>
                                        <LuContact className='w-[30px] h-[30px] text-white md:hidden ' />Contact</button>
                                <button className='text-[white] flex items-center justify-center flex-col gap-[2px] '>
                                        <MdOutlineShoppingCart className='w-[30px] h-[30px] text-white md:hidden ' />Cart</button>

                        </div>
        </div>
        )
}

export default Navbar