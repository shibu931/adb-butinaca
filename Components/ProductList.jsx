import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const ProductList = ({ product }) => {
  const [data, setData] = useState();
  const fetchData = async () => {
    const response = await axios.get('/api/products')
    setData(response.data)
  }
  const deleteProduct = (id)=>{
    const response = axios.delete(`/api/products/${id}`)
    
  }
  useEffect(() => {
    console.log(data)
  }, [data])
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>{
      data?.map((item, index) => (
        <div className='flex p-4 bg-slate-800 rounded' key={index}>
          <Image
            className='rounded object-cover'
            src={item.img.url}
            width={50}
            height={50}
          />
          <div className='ms-5'>
            <h2 className='text-xl'>{item.name}</h2>
            <span className='text-xs'>{item.category}</span>
          </div>
          <div className='ms-auto my-auto'>
            <Link href={`/admin/updateproduct/${item.slug}`} className='mx-2 bg-green-700 px-4 rounded py-2'>
              Edit
            </Link>
            <button onClick={()=>{deleteProduct(item._id)}} className='mx-2 bg-red-700 px-4 rounded py-2'>
              Delete
            </button>
          </div>
        </div>
      ))
    }</div>
  )
}

export default ProductList