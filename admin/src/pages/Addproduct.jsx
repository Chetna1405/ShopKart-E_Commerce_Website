import React, { useContext } from 'react'
import Navbar from "../components/Navbar.jsx"
import Sidebar from '../components/Sidebar'
import upload from "../assets/upload.png"
import { useState } from 'react'
import { AuthDataContext } from '../context/AuthDataContext.jsx'
import axios from 'axios'

const Addproduct = () => {
  let [image1, setImage1] = useState(false);
  let [image2, setImage2] = useState(false);
  let [image3, setImage3] = useState(false);
  let [image4, setImage4] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [price, setPrice] = useState('');
  const [subcategory, setSubcategory] = useState('Topwear');
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  let { serverUrl } = useContext(AuthDataContext);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('subcategory', subcategory);
      formData.append('bestSeller', bestSeller);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('image1', image1);
      formData.append('image2', image2);
      formData.append('image3', image3);
      formData.append('image4', image4);

      let result = await axios.post(serverUrl + "/api/product/addproduct", formData, { withCredentials: true });
      console.log(result.data);
      if (result.data) {
        setName('');
        setDescription('');
        setCategory('Men');
        setPrice('');
        setSubcategory('Topwear');
        setBestSeller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setSizes([]);
      }
    } catch (error) {
      console.log("product add error " , error);
    }
  }


  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative '>
      <Navbar />
      <Sidebar />

      <div className='w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[35px] '>
        <form action="" className='w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px] ' onSubmit={handleAddProduct}>
          <div className='w-[400px] h-[50px] text-[25px]  md:text-[40px] text-white '>
            Add Products
          </div>
          
          {/* Image uploading */}
          <div className='w-[80%] h-[130px] flex items-start justify-center flex-col mt-[20px] gap-[10px]  '>
            <p className='text-[20px] md:text-[25px] font-semibold '>Upload Images</p>
            <div className='w-[100%] h-[100%] flex items-center justify-start '>
              <label htmlFor="image1"
                className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7] '>
                <img src={!image1 ? upload : URL.createObjectURL(image1)} alt=""
                  className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px] ' />
                <input type="file" id="image1" hidden onChange={(e) => setImage1(e.target.files[0])} />
              </label>

              <label htmlFor="image2"
                className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7] '>
                <img src={!image2 ? upload : URL.createObjectURL(image2)} alt=""
                  className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px] ' />
                <input type="file" id="image2" hidden onChange={(e) => setImage2(e.target.files[0])} />
              </label>

              <label htmlFor="image3"
                className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7] '>
                <img src={!image3 ? upload : URL.createObjectURL(image3)} alt=""
                  className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px] ' />
                <input type="file" id="image3" hidden onChange={(e) => setImage3(e.target.files[0])} />
              </label>

              <label htmlFor="image4"
                className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7] '>
                <img src={!image4 ? upload : URL.createObjectURL(image4)} alt=""
                  className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px] ' />
                <input type="file" id="image4" hidden onChange={(e) => setImage4(e.target.files[0])} />
              </label>
            </div>
          </div>
          
          {/* Rest form fields */}

          {/* Name */}
          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px] '>
            <p className='text-[20px] md:text-[25px] font-semibold'>
              Product Name
            </p>
            <input type="text" placeholder='Type here'
              className='w-[600px] max-w-[98%] h-[40px] rounded-lg  hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]  '
              onChange={(e) => setName(e.target.value)} 
              value={name}
              required
            />
          </div>

          {/* Description */}
          <div className='w-[80%]  flex items-start justify-center flex-col gap-[10px] '>
            <p className='text-[20px] md:text-[25px] font-semibold'>
              Product Description
            </p>
            <textarea type="text" placeholder='Type here'
              className='w-[600px] max-w-[98%] h-[100px] py-[10px] rounded-lg  hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]  '
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>
          
          <div className='w-[80%] flex items-center gap-[10px] flex-wrap '>
            {/* Category */}
            <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px] '>
              <p className='text-[20px] md:text-[25px] font-semibold'>Product Category</p>
              <select name="" id="" className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg 
              hover:border-[#46d1f7] '
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                required
                >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            {/* Sub-category */}
            <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px] '>
              <p className='text-[20px] md:text-[25px] font-semibold'>Sub-Category</p>
              <select name="" id="" className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg 
              hover:border-[#46d1f7] '
                onChange={(e) => setSubcategory(e.target.value)}
                value={subcategory}
                required

              >
                <option value="Topwear">Topwear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
          </div>
          {/* Price */}
          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px] '>
            <p className='text-[20px] md:text-[25px] font-semibold'>
              Product Price
            </p>
            <input type="number" placeholder='₹ 100 ..'
              className='w-[600px] max-w-[98%] h-[40px] rounded-lg  hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]  '
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className='w-[100%] h-[220px] md:h-[100px] flex items-start justify-center flex-col gap-[10px] py-[10px] md:py-[0px] '>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Size</p>
            <div className='flex items-center justify-start gap-[15px] flex-wrap '>
              
              <div className={`px-[20px] py-[7px] rounded-lg  text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer 
                ${sizes.includes("S") ? "bg-[#3896ad] text-black border-[#46d1f7]" : "bg-slate-600 text-white"}`}
                onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])} >S</div>
              
              <div className={`px-[20px] py-[7px] rounded-lg  text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer 
                ${sizes.includes("M") ? "bg-[#3896ad] text-black border-[#46d1f7]" : "bg-slate-600 text-white"}`}
                onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])} >M</div>
              
              <div className={`px-[20px] py-[7px] rounded-lg text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer 
                ${sizes.includes("L") ? "bg-[#3896ad] text-black border-[#46d1f7]" : "bg-slate-600 text-white"}`}
                onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])} >
                L
              </div>

              
              <div className={`px-[20px] py-[7px] rounded-lg text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer 
                ${sizes.includes("XL") ? "bg-[#3896ad] text-black border-[#46d1f7]" : "bg-slate-600 text-white"}`}
                onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])} >
                XL
              </div>

              
              <div className={`px-[20px] py-[7px] rounded-lg text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer 
                ${sizes.includes("XXL") ? "bg-[#3896ad] text-black border-[#46d1f7]" : "bg-slate-600 text-white"}`}
                onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])} >
                XXL
              </div>

            </div>
          </div>

          <div className='w-[80%] flex items-center justify-start gap-[10px] mt-[20px] '>
            <input type="checkbox" id='checkbox' className='w-[25px] h-[25px] cursor-pointer ' onChange={(e) => setBestSeller(e.target.checked)} />
            <label htmlFor="checkbox" className='text-[18px] md:text-[22px] font-semibold ' >
              Add to BestSeller
            </label>
          </div>

          <button className='w-[140px] px-[20px] py-[20px] rounded-xl bg-[#65d8f7] flex items-center justify-center gap-[10px] text-black active:bg-slate-700 active:text-white active:border-[2px] border-white '>Add product </button>

          </form>
      </div>

    </div>
  )
}

export default Addproduct