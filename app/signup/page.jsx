'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
// import {toast} from 'react-hot-toast';

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    fullname: '',
    password: '',
    username: ''
  })

  const [buttonDisabled,setButtonDisabled] = useState(true)
  const [loading,setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup",user)
      console.log("Signup success",response.data)
      router.push("/login")
    } catch (error) {
      alert("SignUp Failed")
      // toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(user.email.length > 0  && user.password.length > 0 && user.username.length > 0 && user.fullname.length >0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div className='flex justify-center my-20 text-white flex-col flex-wrap mx-20 '>
      <h2 className='text-2xl text-center mb-4'>{loading ? 'loading':'Signup'}</h2>
      <label htmlFor="fullname">Full Name</label>
      <input
        className='rounded-md p-2 text-gray-900'
        type="text"
        id='fullname'
        value={user.fullname}
        onChange={(e) => { setUser({ ...user, fullname: e.target.value }) }}
      />
      <label htmlFor="username">Username</label>
      <input
        className='rounded-md p-2 text-gray-900'
        type="text"
        id='username'
        value={user.username}
        onChange={(e) => { setUser({ ...user, username: e.target.value }) }}
      />
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
    <button onClick={onSignup} className={`px-2 py-2  outline outline-2 outline-blue-400 mt-4 rounded-md ${buttonDisabled ? 'bg-red-700 hover:bg-red-900' : 'bg-blue-700 hover:bg-blue-900'}`}>{buttonDisabled ? 'Fill Form':'SignUp'}</button>
    <Link className='mt-2 text-center' href={'/login'}>Login</Link>
    </div>
  )
}

export default Signup