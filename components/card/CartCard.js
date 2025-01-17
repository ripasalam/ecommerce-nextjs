import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import React from 'react'
import { toast } from 'react-toastify'

const CartCard = ({ item, deleteItemFromCart }) => {


    const currencyFormat = (value) => {

        const rupiah = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(value)

        return (
            <div>{rupiah}</div>
        )
    }

    const handleDelete = (productId) => {
        deleteItemFromCart(productId)
        toast.success('Item Successfully Removed', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    return (
        <div className='p-3 border-2 border-gray-400 mb-2'>
            <div className='grid sm:grid-cols-4 grid-cols-3'>
                <div className=' col-span-1'>
                    <CldImage
                        width="600"
                        height="600"
                        src={item.image}
                        alt={item.id}
                    />
                    {/* <Image src={item.image} alt={item.id} width={200} height={200} className='h-auto w-auto' /> */}
                </div>
                <div className='flex flex-col sm:col-span-3 col-span-2 ml-5'>
                    <h1 className='text-2xl font-bold text-gray-800'>{item.name}</h1>
                    <h2 className='text-lg font-medium text-gray-500'>{item.size}</h2>
                    <p className='text-xl font-bold text-red-700 grow'>{currencyFormat(item.price)}</p>
                    <div className='flex justify-end'>
                        <button onClick={() => {
                            handleDelete(item.product)
                        }} className='px-6 py-3 text-[14px] rounded-md bg-red-800 hover:bg-red-900 text-white'>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartCard