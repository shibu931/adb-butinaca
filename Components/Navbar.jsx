'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import DropDownMenu from './DropDownMenu'
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";

const img = {
    logo:'/assets/img/logo.png',
    user:'/assets/img/user-icon.png',
    cart:'/assets/img/cart-icon.png',
}

const navMenu =[
    {
        title:'ADB Butinaca',
        slug:'adb-butinaca'
    },
    {
        title:'Research Chemicals',
        subMenu:[
            {
                title: "ARYLCYCLOHEXYLAMINES",
                "slug": "/arylcylohexylamines"
            },
            {
                "title": "BENZODIAZEPINES",
                "slug": "/benzodiazepines"
            },
            {
                "title": "BENZOFURAN",
                "slug": "/benzofuran"
            },
            {
                "title": "CANNABINOIDS",
                "slug": "/cannabinoids"
            },
            {
                "title": "CATHINONEN",
                "slug": "/cathinonen"
            },
            {
                "title": "CYCLOHEXANOL",
                "slug": "/cyclohexanol"
            },
            {
                "title": "CYCLOPYRROLON",
                "slug": "/cyclopyrrolon"
            },
            {
                "title": "AMPHETAMINES",
                "slug": "/amphetamines"
            },
            {
                "title": "LYSERGAMIDES",
                "slug": "/lysergamides"
            },
            {
                "title": "NOOTROPICS",
                "slug": "/nootropics"
            },
            {
                "title": "PHENETHYLAMINES",
                "slug": "/phenethylamines"
            },
            {
                "title": "TRYPTAMINES",
                "slug": "/tryptamines"
            },
            {
                "title": "RC LIQUIDS",
                "slug": "/rc-liquids"
            },
            {
                "title": "HERBAL INCENSE",
                "slug": "/herbal-incense"
            },
            {
                "title": "PELLETS",
                "slug": "/pellets"
            },
            {
                "title": "BLOTTERS",
                "slug": "/blotters"
            },
            {
                "title": "CAPSULES",
                "slug": "/capsules"
            },
            {
                "title": "SARMS",
                "slug": "/sarms"
            }            
        ]
    },
    {
        title:'HHC Shop',
        slug:'hhc-shop'
    },
    {
        title:'Sec Shop',
        slug:'sex-shop'
    },
    {
        title:'Chems Library',
        slug:'chems-library'
    },
    {
        title:'Info',
        slug:'info'
    },
    {
        title:'Contact',
        slug:'contact'
    }
    ,{
        title:'About Us',
        slug:'about-us'
    },
]

const Navbar = () => {
    const [isNavVisible,setIsNavVisible] =useState(false);

const showNav= (e)=>{
    isNavVisible ? setIsNavVisible(false) : setIsNavVisible(true) 
}

    return (
        <nav>
            <div className="top-nav flex justify-between mx-2 lg:mx-10 my-4">
                <Bars3CenterLeftIcon class="h-10 w-10 lg:w-20 text-gray-500 xl:hidden ms-2" onClick={showNav}/>
                <Link href="/">
                    <Image
                        src={img.logo}
                        width={140}
                        height={50}
                        alt='ADB Butinaca'
                    />
                </Link>
                <ul className={`xl:flex bg-gray-900 xl:bg-transparent nav-show my-auto mx-0 ${isNavVisible ? 'show': ''} z-50`}>
                    <XMarkIcon class="h-6 w-6 text-gray-200 ms-auto xl:hidden" onClick={showNav}/>
                    {
                        navMenu?.map((item,index)=>(
                            <li className='text-gray-200 pb-3 lg:pb-0' key={index}>{item.subMenu ? <DropDownMenu options={item}/> : <Link className='text-lg xl:text-sm font-medium px-4 py-2' href={item.slug}>{item.title}</Link>}</li>
                        ))
                    }
                </ul>
                <div className='flex'>
                    <Link className='pe-5' href='/user'>
                        <Image
                            src={img.user}
                            alt='User'
                            width={40}
                            height={40}
                        />
                    </Link>
                    <Link className='' href='/cart'>
                        <Image
                            src={img.cart}
                            alt='User'
                            width={40}
                            height={40}
                        />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar