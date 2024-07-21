import React from 'react'
import { motion, AnimatePresence } from "framer-motion"

const SearchLoading = ({ loading }: { loading: boolean }) => {
    return (
        <AnimatePresence>
            {loading &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`transition-all duration-300 flex w-full flex-col gap-4`}>
                    <div className='skeleton h-8 w-full'></div>
                    <div className='skeleton h-8 w-full'></div>
                    <div className='skeleton h-8 w-full'></div>
                    <div className='skeleton h-8 w-full'></div>
                    <div className='skeleton h-8 w-full'></div>
                    <div className='skeleton h-8 w-full'></div>
                    <div className='skeleton h-8 w-full'></div>
                    <div className='skeleton h-8 w-full'></div>
                    <div className='skeleton h-8 w-full'></div>
                    <div className='skeleton h-8 w-full'></div>
                    <div className='skeleton h-8 w-full'></div>
                    <div className='skeleton h-8 w-full'></div>
                </motion.div>}
        </AnimatePresence>
    )
}

export default SearchLoading