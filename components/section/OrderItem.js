import React from 'react'
import dateFormat from 'dateformat'
import Link from 'next/link'

const OrderItem = ({ order }) => {


    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }
    return (
        <div className=''>
            {order !== undefined &&
                (
                    <div className='flex justify-between px-2 py-4 rounded-lg shadow mb-4'>
                        <div>

                            <p className='font-semibold'>{order.invoice_number}</p>
                            <p className='text-sm'>{dateFormat(order.createdAt, "dddd,  d mmmm yyyy ")}</p>

                            <p className={`text-sm font-semibold ${order.status === "Success"
                                ? "text-green-light"
                                : "text-orange-400"
                                }`}>{order.status}</p>
                        </div>
                        <div>
                            <p className='text-gray-500'>Total Price</p>
                            <p className='font-bold'>{rupiah(order.total_price)}</p>
                            <Link href={`detail-order/${order.invoice_number}`}>
                                <button className='rounded-md text-sm bg-green-light px-8 py-2 text-white font-bold'>Detail transaction</button>
                            </Link>


                        </div>


                    </div>


                )

            }

        </div>
    )
}

export default OrderItem