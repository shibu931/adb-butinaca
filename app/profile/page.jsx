'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  const [data,setData] = useState({})
  const logout = async()=>{
    try {
      const response = await axios.get('/api/users/logout')
      if(response.status == 200)
        router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const getUserDetails = async ()=>{
    const res = await axios.get('/api/users/me')
    const responseData ={...res.data.data}
    setData(responseData)
    console.log(responseData)
  }

  return (
    <div className='text-white my-20'>
        <h2 className='text-3xl text-center font-semibold'>Profile</h2>
        <h2>{data ? 'nothing': `${data.fullname}`}</h2>
        <button onClick={getUserDetails}>Get Data</button>
        <button className='px-4 py-2 bg-red-700 rounded hover:bg-red-800' onClick={logout}>Logout</button>
    </div>
  )
}

export default page