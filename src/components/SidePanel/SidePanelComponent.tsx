import React from 'react'
import ViewWatchList from './ViewWatchList'
import RecentlyViewed from './RecentlyViewed'

const SidePanelComponent = () => {

    return (
        <div className='hidden lg:block h-full w-[85%]'>
            <ViewWatchList />
            <RecentlyViewed />
        </div>
    )
}

export default SidePanelComponent
