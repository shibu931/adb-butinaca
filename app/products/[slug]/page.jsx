'use client'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ProductDescription from '/Components/ProductDescription.jsx'

const ProductPage = ({ params }) => {
  const [products, setProducts] = useState();
  const [description, setDescription] = useState({
    _id:'',
    slug:'',
    title:'',
    description:'',
    category:''
  });
  const [showMessage,setShowMessage] = useState(false);
  const fetchData = async () => {
    try {
      if (params.slug) {
        var response = await axios.get(`/api/products/${params.slug}`)
      }
      const resData = response.data
      if(resData.dataType === 'products'){
        setProducts(resData.data)
      }else{
        setDescription({...resData.data})
      }
    } catch (error) {
      setShowMessage(true)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
        <>
        {
          products ?  
          <div className='flex xl:mx-10 flex-wrap justify-evenly min-h-80'>
            {
              products.map((product,index)=>(<ProductCard product={product} key={index}/>))
            }
          </div>
          : description.slug ?
          (
            <div className='xl:mx-10 mt-10'>
              <ProductDescription description={description.description} title={description.title} />
            </div>
          ): showMessage ? (
            <div className='xl:mx-10'>
              <div className='flex flex-col justify-center h-80'>
                <h2 className='text-3xl md:text-4xl font-medium text-center'><span className='bg-gradient-to-r to-purple-500 from-violet-800 text-transparent bg-clip-text'>Currently, We don't have products in this category</span></h2>
                <h4 className='text-xl md:text-2xl mt-2 text-center font-medium'><span className='bg-gradient-to-r to-purple-500 from-violet-800 text-transparent bg-clip-text'>Products will be added soon!</span></h4>
              </div>
            </div>
          ):''
        }
        </>
  )
}

const ProductCard = ({product}) => {
  return (
    <div className='w-[300px] text-white mx-5 mt-10 bg-slate-900 p-2 md:p-4 rounded border-gray-800 border-2'>
      <Image
        src={product?.img.url}
        width={200}
        height={260}
        alt={product?.name}
        className='w-[200px] mx-auto rounded h-[260px] object-cover'
      />
      <h2 className='text-xl font-medium mt-2 text-center'>{product?.name}</h2>
      <p className='text-purple-400 text-lg font-semibold text-center'>{product?.price[product?.price.length-1]?.price} - {product?.price[1]?.price}</p>
      <hr className='border-slate-800' />
      <Link className="btn-primary px-4 py-2 w-full inline-block rounded-sm text-center font-bold mt-2" href={`/products/view/${product?.slug}`}>View Product</Link>
    </div>
  )
}

export default ProductPage