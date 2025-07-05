import React from 'react'
import { AuthDataContext } from './AuthdataContext'
const AuthContext = ({ children }) => {
    let serverUrl = "http://localhost:8000";

    let value = {
        serverUrl
    }
    return (
        
      <div>
          <AuthDataContext.Provider value={value}>
              {children}
          </AuthDataContext.Provider>
    </div>
  )
}

export default AuthContext