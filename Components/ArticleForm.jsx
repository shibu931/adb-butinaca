'use client'
import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';

const JoditEditor = dynamic(
  () => import('jodit-react'),
  { ssr: false } 
)
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import axios from 'axios';

const ArticleForm = ({ id }) => {
    
    const productCategory = [
      { name: 'Research Chemicals' },
    ]
    const productSubCategory = [
      { name: 'arylcylohexylamines' },
      { name: 'benzodiazepines' },
      { name: 'benzofuran' },
      { name: 'cannabinoids' },
      { name: 'cathinonen' },
      { name: 'cyclohexanol' },
      { name: 'cyclopyrrolon' },
      { name: 'amphetamines' },
      { name: 'lysergamides' },
      { name: 'nootropics' },
      { name: 'phenethylamines' },
      { name: 'tryptamines' },
      { name: 'rc-liquids' },
      { name: 'herbal-incense' },
      { name: 'pellets' },
      { name: 'blotters' },
      { name: 'sarms' },
      { name: '2mmc' },
      { name: '2cmc' },
      { name: 'hhc-shop' },
      { name: 'sex-shop' },
      { name: 'chems-library' },
    ]
    const [selectedCategory, setSelectedCategory] = useState(productCategory[0])
    const [selectedSubCategory, setSelectedSubCategory] = useState(productSubCategory[0])
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [product, setProduct] = useState({
      title: '',
      slug: '',
      description: '',
      category: '',
      subCategory: ''
    })
  
    const submitForm = (e) => {
      e.preventDefault()
      const data = { ...product }
      data.category = selectedCategory.name
      data.subCategory = selectedSubCategory.name
      data.description = content
      if(id){
        axios.put('/api/article', data)
        .then(response => {
          toast.success(
            'Article Updated',{
              position:'bottom-center',
              autoClose:2000,
              theme:'dark'
            }
          )
        })
        .catch(error => {
          console.error('Error:', error);
          toast.error(
            error,{
              position:'bottom-center',
              theme:'dark'
            }
          )
        });
      }else{
        axios.post('/api/article', data)
        .then(response => {
          toast.success(
            'Article Added',{
              position:'bottom-center',
              autoClose:2000,
              theme:'dark'
            }
          )
        })
        .catch(error => {
          console.error('Error:', error);
          toast.error(
            error,{
              position:'bottom-center',
              theme:'dark'
            }
          )
        });
      }
    }
    const fetchData = async (id)=>{
        const response = await axios.get(`/api/article/${id}`)
        setProduct({...response.data})
        setContent(response.data.description)
    }
    useEffect(()=>{
      if(id){
        fetchData(id)
      }
    },[id])
    return (
      <div className='border-2 rounded mt-10 border-slate-800 p-10'>
        <form action="">
          <div className="mb-5">
            <label for="productTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Article Title</label>
            <input value={product.title} type="text" id="productTitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Product Title" required
              onChange={(e) => {
                setProduct({ ...product, title: e.target.value })
              }}
            />
          </div>
          <div className="mb-5">
            <label for="productSlug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Article Slug</label>
            <input value={product.slug} type="text" id="productSlug" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Product Slug" required
              onChange={(e) => {
                setProduct({ ...product, slug: e.target.value })
              }}
            />
          </div>
          <div className="mb-5">
            <label for="productSummary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Article Description</label>
            <div className='text-black'>
              <JoditEditor
                ref={editor}
                value={content}
                tabIndex={1}
                onBlur={newContent => setContent(newContent)}
                onChange={newContent => { }}
              />
            </div>
          </div>
          <div className="mb-5 flex">
            <div className='flex'>
              <div className="w-72 mb-5 me-6">
                <label className='text-gray-400 text-sm mb-2'>Select Product Category</label>
                <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-800 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{selectedCategory.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {productCategory.map((person, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-slate-700 text-slate-200' : 'text-white'
                              }`
                            }
                            value={person}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                  {person.name}
                                </span>
                                {selectedCategory ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <div className="w-72">
                <label className='text-gray-400 text-sm mb-2'>Select Product Sub Category</label>
                <Listbox value={selectedSubCategory} onChange={setSelectedSubCategory}>
                  <div className="relative z-10 mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-800 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{selectedSubCategory.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {productSubCategory.map((person, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-slate-700 text-slate-200' : 'text-white'
                              }`
                            }
                            value={person}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${selectedSubCategory ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                  {person.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
          <button className='w-full btn-primary py-2' onClick={(e) => submitForm(e)}>Upload Product</button>
        </form>
      </div>
    )
  }
  export default ArticleForm