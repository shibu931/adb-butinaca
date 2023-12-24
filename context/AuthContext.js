'use client'
import { createContext,useState,useEffect } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const [edit, setEdit] = useState(false)
    const [user,setUser] = useState({})
    const [error,setError] = useState(null)
    const router = useRouter()
    const [address,setAddress] = useState({
        street:'',
        city:'',
        state:'',
        phoneNo:0,
        zipCode:0,
        country:'',
        userId:user._id
    })
    const logout = async () => {
        try {
            const response = await axios.get('/api/users/logout')
            if (response.status == 200)
                router.push('/login')
                setUser({})
        } catch (error) {
        }
    }
    const postAddress = async (selectedCountry)=>{
        try {
            setAddress({...address,country:selectedCountry})
            setAddress({...address,userId:user._id})
            const response = await axios.post('/api/users/address',address)
            toast.success(
                'Address Added',{
                  position:'bottom-center',
                  autoClose:2000,
                  theme:'dark'
                }
            )
            setEdit(false)
        } catch (error) {
            setError(error)
            toast.error(
                'Something went wrong',{
                  position:'bottom-center',
                  autoClose:2000,
                  theme:'dark'
                }
            )
        }
    }
    const getAddress =async ()=>{
        if(user._id){
            const response= await axios.get(`/api/users/address/${user._id}`)
            setAddress({...response.data})
        }
    }
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
        }
    },[])
    useEffect(()=>{
        getAddress()
    },[user])
    return(
        <AuthContext.Provider
            value={{
                user,
                error,
                getUserDetails,
                address,
                getAddress,
                edit,
                setAddress,
                postAddress,
                logout,
                setEdit,
                isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;