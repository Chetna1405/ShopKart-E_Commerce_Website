import React, { useContext, useEffect, useState } from 'react'
import { ShopDataContext } from './ShopDataContext'
import { AuthDataContext } from './AuthdataContext';
import axios from 'axios';

const ShopContext = ({ children }) => {
    let [products, setProducts] = useState([]);
    let { serverUrl } = useContext(AuthDataContext)
    let currency = '₹';
    let delivery_fee = 40;

    const getProducts = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/product/list")
            console.log(result.data);
            setProducts(result.data);
        } catch (error) {
            console.log("error fetching products ",error);
        }
    }
    useEffect(() => {
        getProducts();
    } , [])
    
    
    let value = {
        products,
        setProducts,
        currency,
        delivery_fee,
        getProducts

    }
    
    return (
        <div>
            <ShopDataContext.Provider value={value}>
                {children}
            </ShopDataContext.Provider>
        </div>
    )
}

export default ShopContext