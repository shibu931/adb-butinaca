'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import axios from 'axios';
import { toast } from 'react-toastify';

const FooterLinks=[{
  title:'Home',
  slug:'/'
},{
  title:'About Us',
  slug:'/about-us'
},{
  title:'Contact Us',
  slug:'/contact'
},{
  title:'Delivery Info',
  slug:'/delivery-info'
},{
  title:'Terms and Conditions',
  slug:'/terms-and-conditions'
}]

const Footer = ({ img }) => {
  const [email,setEmail] = useState()
;  const submitNewsletter = async (e)=>{
    e.preventDefault()
    const resposne = await axios.get(`/api/newsletters/${email}`)
    if (resposne.status == 201) {
      toast.success(
        'Subscribed to newsletter successful',{
          position:'bottom-center',
          autoClose:2000,
          theme:'dark'
        }
      )
    }else{
      toast.error(
        error.response.data.error,{
          position:'bottom-center',
          theme:'dark'
        }
      )
    }
  }
  return (
    <div className='text-white lg:mb-10 lg:mx-10 rounded-xl mt-20'>
      <div className="grid grid-cols-1 lg:gap-20 gap-5 md:grid-cols-2 lg:grid-cols-7 ">
      <div className='col-span-2 mx-4'>
      <Link href='/'>
      <Image
        src={img.logo.path}
        width={140}
        height={50}
        alt={img.logo.alt}
      />
      </Link>
      <p className='mt-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae minus nisi, libero saepe quia cum est. Deserunt quia alias laudantium!</p>
      </div>
      <div className='col-span-2 mx-4'>
        <ul>
          {
            FooterLinks?.map((item,index)=>(
              <li key={index} className='mb-2 flex'><ChevronDoubleRightIcon className="h-4 w-4 mt-1 text-white-200" />
              <Link href={item.slug} className='hover:underline underline-offset-4'>{item.title}</Link></li>
            ))
          }
        </ul>
      </div>
      <div className='w-full bg-violet-700 bg-opacity-20 p-10 rounded-xl col-span-3'>
        <h3 className='text-3xl font-semibold text-gray-200'>Subscribe to our newsletter</h3>
        <form action="" onSubmit={(e)=>submitNewsletter(e)}>
          <div className='flex mt-5 w-full'>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter your mail' required className='px-2 py-1 shadow shadow-gray-700 bg-gray-200 w-full outline-none placeholder:font-semibold placeholder:text-lg placeholder:text-slate-800 bg-opacity-40 text-xl rounded-md rounded-br-none rounded-tr-none'/>
          <button className='btn-primary py-2 px-4 font-medium rounded-tr-md rounded-br-md shadow shadow-gray-700' type='submit'>Submit</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Footer