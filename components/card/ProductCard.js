import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'




const ProductCard = ({ product }) => {

    const router = useRouter()

    const currencyFormat = (value) => {

        const rupiah = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(value)

        return (
            <div>{rupiah}</div>
        )
    }
    return (
        <div className='flex flex-col p-2 border border-gray-300 bg-gradient-to-tl bg-gray-100 rounded-md'>
            <div className='h-32 flex flex-row  justify-center items-center mb-5'>
                <Image
                    src={product.image}
                    width={400}
                    height={400}
                    className='h-auto w-auto'
                    alt='product'
                />
            </div>
            <div className='grow' >
                <p className=' text-gray-800 text-sm hover:text-red-800 hover:underline ease-in duration-150 cursor-pointer ' onClick={() => router.push(`/products/${product.id}`)}>{product.name}</p>
            </div>
            <div className='mt-3'>
                {/* <p className='text-end  text-gray-800'>1 Sold</p> */}
                <p className='text-end font-semibold text-gray-800'>{currencyFormat(product.price)}</p>
            </div>

        </div>

    )
}

export default ProductCard
