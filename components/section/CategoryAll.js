import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CategoryGrid from '../CategoryGrid';

const CategoryAll = () => {



    return (
        <div className='border-t sm:mx-3 px-2 sm:py-10 py-5 '>
            <div className='mx-auto max-w-5xl m'>
                <h1 className='my-5 text-2xl font-black'>Sneaker type : </h1>

                <CategoryGrid />



            </div>


        </div>
    )
}

export default CategoryAll