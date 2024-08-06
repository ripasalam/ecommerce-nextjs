import React from 'react'
import SeeAllButton from '../button/SeeAllButton'
import CategoryGrid from '../CategoryGrid'

const CategorySection = () => {


    return (
        <div className='py-10'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Popular sneakers</h1>
                <SeeAllButton route='/categories' />
            </div>
            <div className='pt-16'>
                <CategoryGrid />
            </div>
        </div>
    )
}

export default CategorySection

