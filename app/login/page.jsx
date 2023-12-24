'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '/context/AuthContext.js'

const Login = () => {
  const router = useRouter()
  const {getUserDetails} = useContext(AuthContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [buttonDisabled,setButtonDisabled] = useState(true)
  const [loading,setLoading] = useState(false);
  const [validationMessages, setValidationMessages] = useState({
    email: '',
    password: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newMessages = {
      email: '',
      password: ''
    };

    if (!user.email) {
      newMessages.email = 'Email is required';
      isValid = false;
    } else if (!user.email.includes('@')) {
      newMessages.email = 'Invalid email address';
      isValid = false;
    }

    if (!user.password) {
      newMessages.password = 'Password is required';
      isValid = false;
    } else if (user.password.length < 8) {
      newMessages.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    setValidationMessages(newMessages);
    return isValid;
  };

  const onLogin = async () => {
    try {
      setLoading(true)
      if(validateForm()){
        const response = await axios.post("/api/users/login", user)
        getUserDetails()
        router.push("/profile")
        toast.success(
          'Login Successfull redirecting',{
            position:'bottom-center',
            autoClose:2000,
            theme:'dark'
          }
        )
      }
    } catch (error) {
      toast.error(
        error.response.data.error,{
          position:'bottom-center',
          theme:'dark'
        }
      )
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    setButtonDisabled(!validateForm());
  },[user])
  return (
    <div className="relative xl:max-w-2xl mx-4 xl:mx-auto md:mx-10 my-10 lg:my-20">
      <div className="glow"></div>
      <div className='w-full flex flex-col text-white rounded-xl border border-purple-800 p-10 lg:px-20 justify-center bg-gray-950 bg-opacity-50'>
          <h2 className='text-3xl font-semibold text-center mb-4'>Login</h2>
          <form action="" onSubmit={(e)=>{e.target.preventDefault()}}>
          <div className="mb-2">
          <label htmlFor="email">Email</label>
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            type="email"
            id='email'
            value={user.email}
            onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
          />
           {validationMessages.email && <p className="text-red-500 text-xs mt-1">{validationMessages.email}</p>}
          </div>
          <div className="mb-2">
          <label htmlFor="password">Password</label>
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            type="password"
            id='password'
            value={user.password}
            onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
          />
           {validationMessages.password && <p className="text-red-500 text-xs mt-1">{validationMessages.password}</p>}
          </div>
          </form>
          <button onClick={onLogin} className={`px-2 py-2  outline outline-1 outline-purple-900 mt-4 rounded-sm ${buttonDisabled ? 'bg-slate-800 text-gray-400' : 'btn-primary'}`} disabled={buttonDisabled}>{loading ? 'Processing...' : 'Submit'}</button>
          <span className='mt-4 text-sm inline text-center'>Don't have an account<br className='lg:hidden'/> Click here to <Link className='underline underline-offset-2' href={'/signup'}>register</Link></span>
      </div>
    </div>
  )
}

export default Login