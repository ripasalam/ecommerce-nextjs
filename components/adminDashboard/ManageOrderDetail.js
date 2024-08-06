import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import DetailProductOrder from '../section/DetailProductOrder';

const ManageOrderDetail = ({ orderId }) => {



    const [detailPayment, setDetailPayment] = useState('');
    const [orderDetail, setOrderDetail] = useState('');
    const [productOrder, setProductOrder] = useState([]);




    useEffect(() => {





        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/order/${orderId}`, {
            headers: { authorization: 'Bearer ' + Cookies.get('token') }
        })
            .then((res) => {
                setOrderDetail(res.data.data)

                const ids = res.data?.data?.orderItems.map((item) => item.productId)



                axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products/productOrder`, {
                    params: {
                        productId: ids,
                    },
                    paramsSerializer: { indexes: null }
                })
                    .then((res) => {

                        setProductOrder(res.data.product)
                    }).catch((error) => {
                        console.log(error)
                    })

            }).catch((error) => {
                console.log(error)
            })



    }, []);





    const onCheckPayment = () => {


        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/${orderId}`, {
            headers: { authorization: 'Bearer ' + Cookies.get('token') }
        })
            .then((res) => {
                setDetailPayment(res.data.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    const status = ["Created", "Processing", "Failed", "Success"]

    const [input, setInput] = useState({
        status: ''
    })

    const handleChange = (e) => {
        setInput({ status: e.target.value })
    }

    const handleUpdateStatus = (e) => {
        e.preventDefault()

        axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/order/${orderId}`, input, {
            headers: { authorization: 'Bearer ' + Cookies.get('token') }
        })
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })


    }

    return (

        <div className=' px-3 py-3 mb-3 bg-white grid grid-cols-12 gap-4 items-start '>

            <div className='grid col-span-8 px-4 py-3 rounded-lg rounded-2 border border-gray bg-white '>
                <div className='border-b border-gray font-bold text-xl'>Order Detail</div>
                <div className='mt-3'>
                    <div className=''>Status: {orderDetail.status}</div>
                    {/* <button onClick={onCheckPayment} className='text-white rounded px-3 py-1 bg-yellow-700'>Check Status Payment</button> */}
                    {detailPayment !== null && (
                        <>
                            <div className="flex pt-3">
                                payment type : {orderDetail?.payment_method}
                            </div>
                            {/* <div className="flex">
                                transaction time : {detailPayment?.transaction_time}
                            </div> */}
                            <div className="flex mt-2">
                                transaction status :
                                <div
                                    className={`ml-2 font-semibold rounded-xl px-2 py-1 text-white ${orderDetail?.transaction_status === "Success"
                                        ? "bg-green-500"
                                        : orderDetail?.transaction_status === "Pending"
                                            ? "bg-blue-500"
                                            : "bg-red-400"
                                        }`}
                                >
                                    {orderDetail?.transaction_status === "Success" ? "Pembayaran berhasil" : orderDetail?.transaction_status === "Pending" ? "Menunggu Pembayaran" : "Pembayaran Gagal"}
                                </div>
                            </div>
                        </>
                    )}

                </div>
                <h2 className='font-bold border-b-2 border-b-gray'>Detail product</h2>
                {productOrder !== null &&
                    productOrder.map((product) => {
                        const orderItem = orderDetail.orderItems.find((order) => order.productId === product.id)
                        return (
                            <DetailProductOrder product={product} orderItem={orderItem} />
                        )
                    }

                    )

                }

            </div>
            <div className='col-span-4'>
                <div className='px-4 py-3 rounded-lg rounded-2 border border-gray'>
                    <h3 className='border-b border-gray font-bold '>Detail Payment</h3>
                    <div className='mt-5'>
                        {/* <div className='flex justify-between text-sm mb-2 '>
                        <p>Subtotal</p>
                        <p>{rupiah(orderDetail.total_price)}</p>
                    </div> */}
                        {/* <div className='flex justify-between text-sm mb-2 '>
                        <p>Shipping</p>
                        <p></p>
                    </div> */}
                        <div className='flex justify-between text-sm mb-2 font-bold '>
                            <p>Total</p>
                            <p>{rupiah(orderDetail.total_price)}</p>

                        </div>
                    </div>
                </div>
                <div className='px-4 py-3 rounded-lg rounded-2 border border-gray mt-5'>
                    <h3 className='border-b border-gray font-bold '>Update Status</h3>
                    <div className='mt-5'>
                        <form onSubmit={handleUpdateStatus}>
                            <div className="w-full  px-3 mb-6 ">
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                <select name='category' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose a category</option>
                                    {status !== null &&
                                        status.map((item) => (
                                            <option value={item} >{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='flex justify-end'>
                                <button type='submit' className='border bg-blue-800 text-white rounded-md py-1 px-2 text-sm '>Update Status</button>
                            </div>


                        </form>

                    </div>
                </div>

            </div>


        </div>
    )
}

export default ManageOrderDetail
