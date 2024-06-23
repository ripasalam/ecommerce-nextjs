import CartContext from '@/context/CartContext';
import React, { useContext, useState, useEffect } from 'react'
import SeeAllButton from '../button/SeeAllButton';
import { IoArrowForwardOutline } from 'react-icons/io5'
import { useRouter } from 'next/router';
import CheckoutCard from '../card/CheckoutCard';
import Cookies from 'js-cookie'
import { headers } from '@/next.config';
import axios from 'axios';
import ShippingSection from './ShippingSection';


const CheckoutSection = () => {
    const router = useRouter();


    const { cart } = useContext(CartContext);
    const userId = Cookies.get('id')

    const amount = cart?.cartItems?.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const currencyFormat = (value) => {

        const rupiah = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(value)

        return (
            <div>{rupiah}</div>
        )
    }

    const handleProcess = async () => {


        const order = {
            product: cart?.cartItems,
            userId: userId,

        }


        axios
            .post(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/order`, order, {
                headers: { Authorization: 'Bearer ' + Cookies.get('token') }
            })
            .then((res) => {


                const orderId = res.data?.order?.id


                if (orderId) {
                    snapPayment(orderId);
                }

            })
            .catch((error) => {
                console.log(error)
            })


    }

    const snapPayment = async (orderId) => {



        const data = {
            userId: userId,
            total: amount
        }
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/payment`, data, {
            headers: { Authorization: 'Bearer ' + Cookies.get('token') }
        })

        const token = res.data.transactionToken

        if (token) {
            window.snap.pay(token, {
                onSuccess: async function (result) {
                    /* You may add your own implementation here */

                    const updateData = {
                        orderId: orderId,
                        status: "Paid",
                        total_price: result.gross_amount,
                        invoice_number: result.order_id,
                        transactionId: result.transaction_id
                    }

                    await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/order/${result.order_id}`, updateData,
                        { headers: { Authorization: 'Bearer ' + Cookies.get('token') } }
                    )
                        .then((res) => {
                            router.push(`/detail-order/${result.order_id}`)
                        })
                    alert("payment success!");



                },
                onPending: async function (result) {
                    /* You may add your own implementation here */



                    const updateData = {
                        orderId: orderId,
                        status: "Processing",
                        total_price: result.gross_amount,
                        invoice_number: result.order_id,
                        transactionId: result.transaction_id
                    }

                    await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/order/${result.order_id}`, updateData,
                        { headers: { Authorization: 'Bearer ' + Cookies.get('token') } }
                    )
                        .then((res) => {
                            router.push(`/detail-order/${result.order_id}`)
                        })



                },
                onError: async function (result) {


                    const updateData = {
                        orderId: orderId,
                        status: "Failed",
                        total_price: result.gross_amount,
                        invoice_number: result.order_id,
                        transactionId: result.transaction_id
                    }

                    await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/order/${result.order_id}`, updateData,
                        { headers: { Authorization: 'Bearer ' + Cookies.get('token') } }
                    )
                        .then((res) => {
                            router.push(`/detail-order/${result.order_id}`)
                        })
                    alert("payment failed!");

                },
                onClose: async function () {
                    /* You may add your own implementation here */
                    const updateData = {
                        orderId: orderId,
                        status: "NotPaid",
                        total_price: result.gross_amount,
                        invoice_number: result.order_id,
                        transactionId: result.transaction_id
                    }

                    await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/checkout/order/${result.order_id}`, updateData,
                        { headers: { Authorization: 'Bearer ' + Cookies.get('token') } }
                    )
                        .then((res) => {
                            router.push(`/detail-order/${result.order_id}`)
                        })
                    alert("not payment!");
                    // router.push(`/detail-order/${orderId}`)
                    // alert("you closed the popup without finishing the payment");
                },

            })

        }
    }



    useEffect(() => {
        const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js"

        const scriptTag = document.createElement("script")
        scriptTag.src = midtransUrl

        const midtransClientKey = process.env.MIDTRANS_CLIENT_KEY;
        scriptTag.setAttribute("data-client-key", midtransClientKey)

        document.body.appendChild(scriptTag)

        return () => {
            document.body.removeChild(scriptTag)
        }
    }, []);

    return (
        <div className='border-t-2 border-t-gray-400 '>
            <div className=' max-w-4xl mx-auto py-10'>
                <h1 className='text-2xl font-bold mb-5'>Your Cart({cart.cartItems?.length}):</h1>
                {cart.cartItems?.length > 0 ? (
                    <>
                        {cart.cartItems?.map((item) => (
                            <CheckoutCard item={item} />
                        ))
                        }
                        <div className=' flex flex-col items-end justify-end'>
                            <p className='text-xl font-bold text-gray-700 mb-3'>Your Total</p>
                            <p className='text-2xl font-bold text-gray-900 mb-5'>{currencyFormat(amount)}</p>
                        </div>
                        <div>
                            <ShippingSection />
                        </div>
                        <div className='flex gap-2 justify-end'>

                            <button onClick={handleProcess} className=' flex items-center justify-center px-6 py-3 text-[14px] rounded-md text-white bg-gray-600 border border-gray-400 hover:bg-gray-200'>
                                process
                                <IoArrowForwardOutline className='text-xl ml-1' />
                            </button>
                        </div>
                    </>

                )


                    :
                    (
                        <div className='flex justify-center items-center'>
                            <p className='text-2xl font-bold text-gray-400'>No Items</p>
                        </div>
                    )
                }

            </div>
        </div >
    )
}

export default CheckoutSection