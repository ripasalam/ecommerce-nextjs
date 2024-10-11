import React from 'react'
import SeeAllButton from '../button/SeeAllButton'
import CategoryGrid from '../CategoryGrid'

const CategorySection = () => {


    return (
        <div className='sm:mx-3 px-2 sm:py-10 py-5'>
            <div className=' mx-auto max-w-7xl flex flex-row items-center justify-between mb-4'>
                <h1 className='text-2xl font-bold'>Sneakers Type</h1>
                <SeeAllButton route='/categories' />
            </div>
            <div className=''>
                <CategoryGrid />
            </div>
        </div>
    )
}

export default CategorySection

