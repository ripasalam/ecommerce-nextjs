import Image from 'next/image'
import React from 'react'


const DetailProductOrder = ({ product, orderItem }) => {

    // console.log(product)
    // console.log(orderItem)

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    return (
        <div className='p-3 border-b mb-2'>
            <div className='grid sm:grid-cols-4 grid-cols-3'>

                <div className=' col-start-1 col-span-1'>
                    <Image src={product.image} alt={product.id} width={200} height={200} className='h-auto w-auto' />
                </div>
                <div className='flex flex-col col-start-2 col-span-2 ml-2'>
                    <div className='grow'>
                        <h1 className='font-bold text-gray-800'>{product.name}</h1>
                    </div>
                    <div className='font-bold text-red-700 flex'>
                        <p className=''>{orderItem.quantity}</p>
                        <p className='mx-2'>X</p>
                        <p className='  '>{rupiah(orderItem.item_price)}</p>
                    </div>


                </div>
                <div className='col-start-4 col-span-1 items-end flex flex-col'>
                    <div className='grow'>
                        <h1 className='font-bold text-gray-800'>total Price</h1>
                    </div>
                    <div>
                        <p className=' font-bold text-red-700'>{rupiah(orderItem.quantity * orderItem.item_price)}</p>
                    </div>

                </div>
                <div>
                </div>
            </div>
        </div>

    )
}

export default DetailProductOrder