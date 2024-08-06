import Image from 'next/image'
import Link from 'next/link'

import React from 'react'


const CategoryCard = ({ category }) => {




    return (
        <div className=' group cursor-pointer hover:border-red-800 sm:p-5 p-2 border border-gray-300 bg-gradient-to-tl bg-gray-100 rounded-md'>
            <Link href={`/categories/${category.id}`}>
                <div className='flex flex-row justify-center items-center'>
                    <Image
                        src={category.image}
                        width={300}
                        height={300}
                        className='h-auto w-auto'
                        alt='product'
                    />
                </div>
                <div className='mt-10 text-center'>
                    <p className=' text-gray-800 group-hover:text-red-800 text-4xl font-bold'>{category.name}</p>
                </div>
            </Link>

        </div>
    )
}

export default CategoryCard
