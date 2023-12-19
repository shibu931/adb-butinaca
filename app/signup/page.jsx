'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    fullname: '',
    password: '',
    username: ''
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false);
  const [validationMessages, setValidationMessages] = useState({
    email: '',
    fullname: '',
    username: '',
    password: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newMessages = {
      email: '',
      fullname: '',
      username: '',
      password: ''
    };

    if (!user.fullname) {
      newMessages.fullname = 'Name is required';
      isValid = false;
    }

    if (!user.username) {
      newMessages.username = 'Username is required';
      isValid = false;
    }

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

  const onSignup = async () => {
    try {
      setLoading(true)
      if(validateForm()){
        const response = await axios.post("/api/users/signup", user)
        toast.success(
          'Signup Successfull redirecting',{
            position:'bottom-center',
            autoClose:2000,
            theme:'dark'
          }
        )
        setTimeout(() => {
          router.push("/login")
        }, 2000);
      }
    } catch (error) {
      toast.error(
        error.response.data.error,{
          position:'bottom-center',
          theme:'dark'
        }
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setButtonDisabled(!validateForm());
  }, [user])

  return (
    <div className="relative xl:max-w-2xl mx-4 md:mx-auto my-10 lg:my-20">
       <ToastContainer />
      <div className="glow"></div>
      <div className='w-full flex flex-col text-white rounded-xl border border-purple-800 p-10 lg:px-20 justify-center bg-gray-950 bg-opacity-50'>
          <h2 className='text-3xl font-semibold text-center mb-4'>Create a new account</h2>
          <form action="" onSubmit={(e)=>{e.target.preventDefault()}}>
          <div className="mb-2">
          <label htmlFor="fullname">Name</label>
          <input
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            type="text"
            id='fullname'
            value={user.fullname}
            onChange={(e) => { setUser({ ...user, fullname: e.target.value }) }}
          />
           {validationMessages.fullname && <p className="text-red-500 text-xs mt-1">{validationMessages.fullname}</p>}
          </div>
          <div className="mb-2"><label htmlFor="username">Username</label>
          <input
            className='mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            type="text"
            id='username'
            value={user.username}
            onChange={(e) => { setUser({ ...user, username: e.target.value }) }}
          />
           {validationMessages.username && <p className="text-red-500 text-xs mt-1">{validationMessages.username}</p>}</div>
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
          <button onClick={onSignup} className={`px-2 py-2  outline outline-1 outline-purple-900 mt-4 rounded-sm ${buttonDisabled ? 'bg-slate-800 text-gray-400' : 'btn-primary'}`} disabled={buttonDisabled}>{loading ? 'Processing...' : 'Submit'}</button>
          <span className='mt-4 text-sm inline text-center'>Already have an account<br className='lg:hidden'/> Click here to <Link className='underline underline-offset-2' href={'/login'}>Login</Link></span>
      </div>
    </div>
  )
}

export default Signup