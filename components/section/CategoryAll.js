import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CategoryGrid from '../CategoryGrid';

const CategoryAll = () => {



    return (
        <div className='border-t sm:py-10 py-5 '>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Sneaker type: </h1>
            </div>
            <div className='pt-16'>
                <CategoryGrid />
            </div>
        </div>
    )
}

export default CategoryAll