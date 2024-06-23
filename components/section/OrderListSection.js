import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import OrderItem from './OrderItem'


const OrderListSection = () => {

    const statusOrders = ["All", "Success", "Processing", "Failed"];

    const [searchQuery, setSearchQuery] = useState('')
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState(statusOrders[0]);
    const [orderList, setOrderList] = useState([])
    const [detailPayment, setDetailPayment] = useState([])



    useEffect(() => {
        let ignore = false;

        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/my-order`, {
            headers: { authorization: 'Bearer ' + Cookies.get('token') },
            params: {
                searchQuery: search,
                status
            }
        })
            .then((res) => {
                if (!ignore) {
                    setOrderList(res.data.data)
                }
            }).catch((error) => {
                console.log(error)
            })
        return () => {
            ignore = true
        }
    }, [search, status])

    const handleSearch = async (e) => {
        e.preventDefault()

        const searchValue = e.target.elements.search.value;

        setSearch(searchValue)
    }

    const handleChange = async (e) => {

        setSearchQuery(e.target.value)
    }


    return (
        <div className='my-5'>
            <h3 className='font-bold text-lg mb-5 '>Transaction List</h3>
            <div className='rounded-lg border border-gray py-3 px-2'>
                <div className='mb-3'>
                    <form onSubmit={handleSearch}>
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">

                            <input
                                type="text"
                                onChange={handleChange}
                                value={searchQuery}
                                name='search'
                                placeholder="Cari transaksimu disini"
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-gray-50  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 ">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
                <div className='mb-5'>
                    <div className='flex gap-5 items-center'>
                        <div className='font-bold'>Status</div>
                        <div className=' flex gap-3'>
                            {statusOrders.map((item) => (
                                <button onClick={() => { setStatus(item) }} className={`py-1 px-3 rounded-md border ${status === item ? "border-green-border-light text-green-light bg-green-bg-choice" : "border-gray-500 text-gray-500"} `}>
                                    {item}
                                </button>
                            ))

                            }

                        </div>
                    </div>

                </div>
                {orderList.length > 0 &&
                    orderList.map((orderItem) => {

                        return (
                            <OrderItem order={orderItem} key={orderItem} />
                        )

                    }

                    )
                }

                {orderList.length === 0 &&
                    <div className='py-10 text-center text-gray-500'>
                        <div>data not found</div>
                    </div>

                }

            </div>
        </div>
    )
}

export default OrderListSection