'use client'
import useSearchStore from '@/store/Search'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import SearchLoading from './loading/SearchLoading'
import { motion, AnimatePresence } from 'framer-motion'

const SearchModal = () => {
    const { fetchSuggestions, loading, setQuery, suggestions } = useSearchStore((state) => state)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const handler = setTimeout(() => {
            setQuery(searchTerm)
            if (searchTerm) {
                fetchSuggestions(searchTerm)
            }
        }, 1000)

        return () => {
            clearTimeout(handler)
        }
    }, [searchTerm, fetchSuggestions, setQuery])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className='font-poppins'>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box pt-0 font-poppins">
                    <div className='flex justify-center items-center sticky -top-0 py-4 left-0 w-full bg-white'>
                        <input
                            className="p-4 my-2 rounded-lg w-full outline-none placeholder:text-[#262626] border-2 border-gray-300"
                            type="text"
                            placeholder='Search Coins'
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                    </div>
                    <SearchLoading loading={loading} />
                    <AnimatePresence>
                        {!loading &&
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}>
                                <div className=''>
                                    {
                                        suggestions.map((suggestion, index) => (
                                            <>
                                                <Link
                                                    onClick={() => {
                                                        const modal = document.getElementById('my_modal_2');
                                                        (modal as HTMLDialogElement)?.close()
                                                    }}
                                                    href={`/coins/${suggestion.id}`} passHref>
                                                    <div key={index} className='flex items-center space-x-3'>
                                                        <Image className='h-4 w-4 border-2 border-gray-300 rounded-full' src={suggestion.thumb} height={100} width={100} alt={suggestion.name} />
                                                        <p>{suggestion.name}</p>
                                                    </div>
                                                </Link>
                                                <div className="divider my-1"></div>
                                            </>
                                        ))
                                    }
                                </div>
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >
        </div >
    )
}

export default SearchModal