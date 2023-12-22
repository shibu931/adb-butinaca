'use client'
import {useRouter} from 'next/navigation'
import { createContext,useState,useEffect } from 'react'
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const [user,setUser] = useState({})
    const [error,setError] = useState(null)
    const getUserDetails = async ()=>{
        const res = await axios.get('/api/users/user')
        const responseData ={...res.data.data}
        setUser(responseData)
        setIsAuthenticated(true)
    }
    useEffect(()=>{
        try {
            getUserDetails()
        } catch (error) {
            console.log(error);
        }
    },[])
    return(
        <AuthContext.Provider
            value={{
                user,
                getUserDetails
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;