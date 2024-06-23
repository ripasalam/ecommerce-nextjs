import CartContext from '@/context/CartContext';
import React, { useContext } from 'react'
import SeeAllButton from '../button/SeeAllButton';
import CartCard from '../card/CartCard';
import { IoArrowForwardOutline } from 'react-icons/io5'
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

const CartSection = () => {

    const router = useRouter();

    const userId = Cookies.get('id')


    const { cart, deleteItemFromCart } = useContext(CartContext);

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

    const handleCheckout = () => {

        if (!userId) {
            toast.error('Please sign-in before checking out', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            router.push('/checkout/payment')
        }




    }

    return (
        <div className='border-t-2 border-t-gray-400 '>
            <div className=' max-w-4xl mx-auto py-10'>
                <h1 className='text-2xl font-bold mb-5'>Your Cart({cart.cartItems?.length}):</h1>
                {cart.cartItems?.length > 0 ? (
                    <>
                        {cart.cartItems?.map((item) => (
                            <CartCard item={item} deleteItemFromCart={deleteItemFromCart} />
                        ))
                        }
                        <div className=' flex flex-col items-end justify-end'>
                            <p className='text-xl font-bold text-gray-700 mb-3'>Your Total</p>
                            <p className='text-2xl font-bold text-gray-900 mb-5'>{currencyFormat(amount)}</p>
                        </div>
                        <div className='flex gap-2 justify-end'>
                            <button onClick={() => { router.push('/') }} className=' flex items-center justify-center px-6 py-3 text-[14px] rounded-md text-gray-600 border border-gray-400 hover:bg-gray-200'>
                                Continue Shopping
                            </button>
                            <button onClick={handleCheckout} className=' flex items-center justify-center px-6 py-3 text-[14px] rounded-md text-white bg-gray-600 border border-gray-400 hover:bg-gray-200'>
                                Checkout
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

export default CartSection