'use client'
import { Menu, Transition } from '@headlessui/react'
import { Fragment} from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function DropDownMenu({ options }) {
  return (
    <div className="w-auto text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 text-lg xl:text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            {options.title}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="xl:absolute relative right-0 mt-2 lg:text-sm text-xs origin-top-right divide-y divide-gray-900 rounded-md bg-slate-900 shadow-lg ring-1 ring-black/5 focus:outline-none">
            {
              options.subMenu?.map((item, index) => (
                <div className=' px-4' key={index}>
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <Link href={item.slug}
                        className={`${active ? 'bg-violet-500 text-white' : 'text-white'
                          } group flex w-full items-center rounded-md px-2 py-2 lg:text-sm`}
                      >
                        {item.title}
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              ))
            }
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

