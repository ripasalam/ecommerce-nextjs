import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import DetailProductOrder from '../section/DetailProductOrder';

const ManageOrderDetail = ({ orderId }) => {


    console.log(orderId)
    const [detailPayment, setDetailPayment] = useState('');
    const [orderDetail, setOrderDetail] = useState('');
    const [productOrder, setProductOrder] = useState([]);




    useEffect(() => {



        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/${orderId}`)
            .then((res) => {
                setDetailPayment(res.data.data)

            }).catch((error) => {
                console.log(error)
            })

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

    console.log(detailPayment)
    console.log(orderDetail)
    console.log(productOrder)

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

    // const rupiah = (number) => {
    //     return new Intl.NumberFormat("id-ID", {
    //         style: "currency",
    //         currency: "IDR"
    //     }).format(number);
    // }

    return (

        <div className=' px-3 py-3 mb-3 bg-white grid grid-cols-12 gap-4 items-start '>

            <div className='grid col-span-8 px-4 py-3 rounded-lg rounded-2 border border-gray bg-white '>
                <div className='border-b border-gray font-bold text-xl'>Order Detail</div>
                <div className='mt-3'>
                    <h2 className='font-bold'>Payment Status</h2>
                    <button onClick={onCheckPayment} className='text-white rounded px-3 py-1 bg-yellow-700'>Check Status Payment</button>
                    {detailPayment !== null && (
                        <>
                            <div className="flex pt-3">
                                payment type : {detailPayment?.payment_type}
                            </div>
                            <div className="flex">
                                transaction time : {detailPayment?.transaction_time}
                            </div>
                            <div className="flex mt-2">
                                transaction status :
                                <div
                                    className={`ml-2 font-semibold rounded-xl px-2 py-1 text-white ${detailPayment?.transaction_status === "settlement"
                                        ? "bg-green-500"
                                        : "bg-blue-400"
                                        }`}
                                >
                                    {detailPayment?.transaction_status}
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


        </div>
    )
}

export default ManageOrderDetail
