'use client'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

export default function FAQs({ faqs }) {
    return (
        <div className="w-full px-4 pt-16 text-white">
            <h2 className='text-3xl text-center text-white-200'>Frequently Asked Questions(FAQs)</h2>
            <div className="mx-auto w-full max-w-2xl rounded-2xl md:px-10 py-5">
                {
                    faqs?.map((item, index) => (
                        <Disclosure key={index} as="div" className="mt-3">
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gradient-to-br from-violet-800 to-purple-700 hover:from-violet-900 hover:to-purple-800 px-4 py-2 text-left text-lg font-normal text-white focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                        <h3>{item.title}</h3>
                                        <ChevronUpIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 text-purple-500`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pb-2 pt-4 text-md text-gray-200">
                                        <p>{item.content}</p>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ))
                }
            </div>
        </div>
    )
}