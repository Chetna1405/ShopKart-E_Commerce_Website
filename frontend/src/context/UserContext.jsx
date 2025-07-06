import React from 'react'
import { UserDataContext } from './UserDataContext'
import { useState } from 'react';
import { useContext } from 'react';
import { AuthDataContext } from './AuthdataContext';
import axios from 'axios';
import { useEffect } from 'react';

const UserContext = ({ children }) => {
    const [userdata, setUserdata] = useState();
    let { serverUrl } = useContext(AuthDataContext); 

    const getCurrentUser = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/user/getcurrentuser", { withCredentials: true });
            setUserdata(result.data);
            console.log(result.data);

        } catch (error) {
            setUserdata(null);
            console.log(error);
        }
    }

    useEffect(() => {
        getCurrentUser();
    });

    let value = {
        userdata,
        setUserdata,
        getCurrentUser
    };


    return (
        <div>
            <UserDataContext.Provider value={value}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext