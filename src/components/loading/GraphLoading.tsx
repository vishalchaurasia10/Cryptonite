import React from 'react'

const GraphLoading = ({ loading }: { loading: boolean }) => {

    return (
        <div className={`${loading ? 'opacity-100' : 'opacity-0'} transition-all duration-300 absolute flex w-full h-[400px] flex-col gap-4 pl-10`}>
            <div className='skeleton h-4 w-40'></div>
            <div className="skeleton h-full w-full"></div>
        </div>
    )
}

export default GraphLoading
