import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { RiEyeFill } from "react-icons/ri";
import Link from 'next/link';

const ManageOrder = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        let ignore = false;
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/order`, {
            headers: { authorization: 'Bearer ' + Cookies.get('token') }
        })
            .then((res) => {
                if (!ignore) {
                    setOrders(res.data.data)
                }
            }).catch((error) => {
                console.log(error)
            })

        return () => {
            ignore = true
        }
    }, [])

    console.log(orders)

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">
            <table className="w-full text-sm text-left -z-10 text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            invoice_number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Customer Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Payment status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Delivery status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders !== null &&
                        orders.map((order) => (
                            <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {order.invoice_number}
                                </th>
                                <td className="px-6 py-4">
                                    {order.user.name}
                                </td>
                                <td className="px-6 py-4">
                                    {order.total_price}
                                </td>
                                <td className="px-6 py-4">
                                    {order.transaction_status}
                                </td>
                                <td className="px-6 py-4">
                                    {order.status}
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`manage-order/${order.invoice_number}`}>
                                        <button className='flex justify-center items-center gap-2 py-2 px-3 border border-gray-300 bg-gradient-to-tl bg-gray-100 rounded-md hover:bg-blue-900'>
                                            <RiEyeFill />
                                        </button>
                                    </Link>

                                </td>
                            </tr>

                        ))}


                </tbody>
            </table>
        </div>

    )
}

export default ManageOrder
