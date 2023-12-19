'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProductPage = ({params}) => {
  const [product,setProduct] = useState();
  const fetchData = async()=>{
    try {
        if(params.slug){
            var response = await axios.get(`/api/products/${params.slug}`)
        }
        const resData = {...response.data}
        console.log(resData)
        setProduct(resData)
        console.log("product",product)
    } catch (error) {
        console.log(error.response.data.message)    
    }
}
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className='text-white product-description mx-20 mt-10 bg-slate-900 p-5 md:py-10 md:px-20 rounded border-gray-800 border-2'>
       {
        product ? <div dangerouslySetInnerHTML={{ __html: product.description }} /> :''
       } 
    </div>
  )
}

export default ProductPage