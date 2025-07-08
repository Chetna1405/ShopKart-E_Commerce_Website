import React, { useContext, useEffect, useState } from 'react'
import { AdminDataContext } from './AdminDataContext'
import { AuthDataContext } from './AuthDataContext';
import axios from 'axios';

const AdminContext = ({ children }) => {
    let [adminData, setAdminData] = useState(null);
    let { serverUrl } = useContext(AuthDataContext);

    const getAdmin = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/user/getadmin", { withCredentials: true });
            console.log(result.data);
            setAdminData(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAdmin() 
    } ,[])

    let value = {
        adminData, 
        getAdmin, 
        setAdminData
    }
    return (
        <div>
            <AdminDataContext.Provider value={value}>
                {children}
            </AdminDataContext.Provider>
        </div>
    )
}

export default AdminContext