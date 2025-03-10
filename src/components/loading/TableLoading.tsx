import React from 'react'
import { motion, AnimatePresence } from "framer-motion"

const TableLoading = ({ loading }: { loading: boolean }) => {
    return (
        <AnimatePresence>
            {loading &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`transition-all duration-300 flex w-full h-screen flex-col gap-4`}>
                    <div className='skeleton h-10 w-60'></div>
                    <div className="skeleton h-full w-full"></div>
                </motion.div>}
        </AnimatePresence>
    )
}

export default TableLoading
