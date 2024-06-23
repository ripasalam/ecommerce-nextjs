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
        <div className='mt-5'>

            <div className='flex justify-between flex-row py-3 border-b'>
                <div className='flex flex-row'>
                    <img
                        src={`${product.image}`}

                        className="w-28 h-28  rounded-lg"
                    />
                    <div className='flex flex-col pl-3'>
                        <p className='grow'>{product.name}</p>
                        <div className='flex justify-between'>
                            <div className='flex'>
                                <p>{orderItem.quantity}</p>
                                <p className='mx-2'>X</p>
                                <p>{rupiah(orderItem.item_price)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-self-end'>
                    <div className='grow'>Total Price</div>
                    <div className=''>
                        <p>{rupiah(orderItem.item_price * orderItem.quantity)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailProductOrder