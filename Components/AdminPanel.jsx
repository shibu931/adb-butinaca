'use client'
import { useEffect, useState } from 'react';
import ProductList from '/Components/ProductList'
import ProductForm from '/Components/ProductForm'

const AdminPanel = ({pathname,id}) => {
    const product = {
      title: 'ADB Butinaca',
      img: 'https://placehold.co/50x50',
      category: 'Reaserch Chemicals'
    }
  const [openTab, setOpenTab] = useState('');
    
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
      setActiveTab(tabNumber);
  };
  useEffect(()=>{
    if(pathname && id) setOpenTab(pathname)
  },[])
  return (
    <div className='max-w-10xl text-white my-10 mx-10'>
    <div className="grid lg:grid-cols-8 lg:gap-20">
      <div className="col-span-2 h-auto">
        <ul className=''>
          <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab === 1 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(1)}>Product's</button></li>
          <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab === 2 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(2)}>Product Category</button></li>
          <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab === 3 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(3)}>Product Sub Category</button></li>
          <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab === 4 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(4)}>SEO</button></li>
          <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab === 5 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(5)}>Article Page</button></li>
          <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab === 6 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(6)}>User</button></li>
          <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab === 7 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(7)}>Orders</button></li>
        </ul>
      </div>
      <div className="col-span-6">
        <div className='bg-slate-900 py-10 w-full rounded px-10'>
          <button className='px-4 py-2 btn-primary rounded font-semibold' onClick={(e) => { e.preventDefault(); setOpenTab('add-product') }}>Add Product</button>
          <button className='px-4 py-2 btn-primary rounded font-semibold ms-2' onClick={(e) => { e.preventDefault(); setOpenTab('') }}>View Product</button>
          {
            openTab === '' ?
              <ul className='mt-5'>
                <li>
                  <ProductList product={product} />
                </li>
              </ul> :
              openTab === 'add-product' ? 
                <ProductForm />
              : 
              openTab === 'update-product' ? 
                <ProductForm id={id} />
              : ''
          }
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminPanel