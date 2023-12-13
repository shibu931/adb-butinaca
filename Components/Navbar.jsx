'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import DropDownMenu from './DropDownMenu'
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Cart from './Cart'

const navMenu =[
    {
        title:'Buy ADB Butinaca',
        className:'btn-primary rounded-sm',
        slug:'adb-butinaca'
    },
    {
        title:'Research Chemicals',
        subMenu:[
            {
                title: "ARYLCYCLOHEXYLAMINES",
                className:'',
                slug: "/arylcylohexylamines"
            },
            {
                "title": "BENZODIAZEPINES",
                className:'',
                slug: "/benzodiazepines"
            },
            {
                "title": "BENZOFURAN",
                className:'',
                slug: "/benzofuran"
            },
            {
                "title": "CANNABINOIDS",
                className:'',
                slug: "/cannabinoids"
            },
            {
                "title": "CATHINONEN",
                className:'',
                slug: "/cathinonen"
            },
            {
                "title": "CYCLOHEXANOL",
                className:'',
                slug: "/cyclohexanol"
            },
            {
                "title": "CYCLOPYRROLON",
                className:'',
                slug: "/cyclopyrrolon"
            },
            {
                "title": "AMPHETAMINES",
                className:'',
                slug: "/amphetamines"
            },
            {
                "title": "LYSERGAMIDES",
                className:'',
                slug: "/lysergamides"
            },
            {
                "title": "NOOTROPICS",
                className:'',
                slug: "/nootropics"
            },
            {
                "title": "PHENETHYLAMINES",
                className:'',
                slug: "/phenethylamines"
            },
            {
                "title": "TRYPTAMINES",
                className:'',
                slug: "/tryptamines"
            },
            {
                "title": "RC LIQUIDS",
                className:'',
                slug: "/rc-liquids"
            },
            {
                "title": "HERBAL INCENSE",
                className:'',
                slug: "/herbal-incense"
            },
            {
                "title": "PELLETS",
                className:'',
                slug: "/pellets"
            },
            {
                "title": "BLOTTERS",
                className:'',
                slug: "/blotters"
            },
            {
                "title": "CAPSULES",
                className:'',
                slug: "/capsules"
            },
            {
                "title": "SARMS",
                className:'',
                slug: "/sarms"
            }            
        ]
    },
    {
        title:'HHC Shop',
        className:'',
        slug:'hhc-shop'
    },
    {
        title:'Sex Shop',
        className:'',
        slug:'sex-shop'
    },
    {
        title:'Chems Library',
        className:'',
        slug:'chems-library'
    },
    {
        title:'Info',
        className:'',
        slug:'info'
    },
    {
        title:'Contact',
        className:'',
        slug:'contact'
    }
    ,{
        title:'About Us',
        className:'',
        slug:'about-us'
    },
]

const Navbar = ({img}) => {
    const [isNavVisible,setIsNavVisible] =useState(false);

const showNav= (e)=>{
    isNavVisible ? setIsNavVisible(false) : setIsNavVisible(true) 
}

    return (
        <nav>
            <div className="top-nav flex justify-between mx-2 lg:mx-10 my-4">
                <Bars3CenterLeftIcon className="h-10 w-10 lg:w-20 text-gray-500 xl:hidden ms-2" onClick={showNav}/>
                <Link href="/">
                    <Image
                        src={img.logo.path}
                        width={140}
                        height={50}
                        alt={img.logo.alt}
                    />
                </Link>
                <ul className={`xl:flex bg-gray-900 xl:bg-transparent nav-show my-auto mx-0 ${isNavVisible ? 'show': ''} z-50`}>
                    <XMarkIcon className="h-6 w-6 text-gray-200 ms-auto xl:hidden" onClick={showNav}/>
                    {
                        navMenu?.map((item,index)=>(
                            <li className='text-gray-200 pb-3 lg:pb-0' key={index}>{item.subMenu ? <DropDownMenu options={item}/> : <Link className={`text-lg xl:text-sm font-medium px-4 py-2 ${item.className ? item.className : ''}`} href={item.slug}>{item.title}</Link>}</li>
                        ))
                    }
                </ul>
                <div className='flex'>
                    <Link className='pe-5' href='/profile'>
                        <Image
                            src={img.user}
                            alt='User'
                            width={40}
                            height={40}
                        />
                    </Link>
                    <Cart/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar