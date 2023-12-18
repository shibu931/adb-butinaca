'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Login = () => {
  const router = useRouter()
  
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [buttonDisabled,setButtonDisabled] = useState(true)
  const [loading,setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login",user)
      console.log("Login Success ",response.data)
      router.push("/profile")
    } catch (error) {
      console.log("Login Failed ",error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
   if(user.email.length > 0 && user.password.length > 0)
    setButtonDisabled(false)
   else 
    setButtonDisabled(true)
  },[user])
  return (
    <div className='flex justify-center my-20 text-white flex-col flex-wrap mx-20 '>
      <h2 className='text-2xl text-center mb-4'>{loading ? 'Loading': 'Login'}</h2>

      <label htmlFor="email">email</label>
      <input
        className='rounded-md p-2 text-gray-900'
        type="email"
        id='email'
        value={user.email}
        onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
      />
      <label htmlFor="password">password</label>
      <input
        className='rounded-md p-2 text-gray-900'
        type="password"
        id='password'
        value={user.password}
        onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
      />
    <button onClick={onLogin} className={`px-2 py-2 outline outline-2 outline-blue-400 mt-4 rounded-md ${buttonDisabled ? 'bg-red-700 hover:bg-red-900':'bg-blue-700 hover:bg-blue-900'}`} disabled={false}>Submit</button>
    <Link className='mt-2 text-center' href={'/signup'}>SignUp</Link>
    </div>
  )
}

export default Login