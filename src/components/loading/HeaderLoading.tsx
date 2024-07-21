import React from 'react'
import { motion, AnimatePresence } from "framer-motion"

const HeaderLoading = ({ loading }: { loading: boolean }) => {
    return (
        <AnimatePresence>
            {loading &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`transition-all duration-300 flex w-full flex-col gap-4 pb-4`}>
                    <div className='skeleton h-8 w-8 border rounded-lg p-1'></div>
                    <div className='skeleton h-6 w-40'></div>
                    <div className="skeleton h-10 w-80"></div>
                </motion.div>}
        </AnimatePresence>
    )
}

export default HeaderLoading
