import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DetailProductOrder from './DetailProductOrder'
import Cookies from "js-cookie"


const DetailOrderSection = () => {

    const router = useRouter()
    const orderId = router.query.orderId;
    const [detailPayment, setDetailPayment] = useState('');
    const [orderDetail, setOrderDetail] = useState('');
    const [productOrder, setProductOrder] = useState([]);



    useEffect(() => {



        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/my-order/${orderId}`, {
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



    }, [orderId]);


    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }




    return (
        <div className=' px-3 py-3 mb-3 bg-white grid grid-cols-12 gap-4 items-start '>

            <div className='grid col-span-8 px-4 py-3 rounded-lg rounded-2 border border-gray bg-white '>
                <div className='border-b border-gray font-bold text-xl'>Shipping Information</div>
                <div className='mt-3'>
                    <div className=''>Status: {orderDetail.status}</div>
                    {/* <button onClick={onCheckPayment} className='text-white rounded px-3 py-1 bg-yellow-700'>Check Status Payment</button> */}
                    {orderDetail !== null && (
                        <>
                            {/* <div className="flex pt-3">
                                payment type : {detailPayment?.payment_type}
                            </div> */}
                            <div className="flex">
                                {orderDetail.payment_method ? `payment method : ${orderDetail.payment_method}` : ""}
                            </div>
                            <div className="flex mt-2">
                                transaction status :
                                <div
                                    className={`ml-2 font-semibold rounded-xl px-2 py-1 text-white ${orderDetail?.transaction_status === "Success"
                                        ? "bg-green-500"
                                        : orderDetail?.transaction_status === "Pending" ? "bg-blue-400" : "bg-red-500"
                                        }`}
                                >
                                    {orderDetail.transaction_status === "Success" ? "Pembayaran berhasil" : orderDetail.transaction_status === "Pending" ? "Menunggu Pembayaran" : "Pembayaran Gagal"}
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
            <div className='grid auto-rows-min col-span-4 px-4 py-3 rounded-lg rounded-2 border border-gray'>
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

        </div>
    )
}

export default DetailOrderSection