import { Menu, MenuHandler, MenuList, Button, MenuItem } from '@material-tailwind/react'
import React, { useState, useContext } from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import CartContext from '@/context/CartContext'
import Image from 'next/image'
import { useRouter } from 'next/router'
import SeeAllButton from '../button/SeeAllButton'
import { usePathname } from 'next/navigation'
import { toast } from 'react-toastify'

const CartMenu = () => {

    const router = useRouter();
    const path = usePathname();

    const toHide =
        path &&
        (["/cart", "/orders/status"].includes(path) ||
            path.startsWith("/checkout"));

    const { addItemToCart, cart, deleteItemFromCart } = useContext(CartContext);

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

    if (toHide) {
        return <></>;
    }
    // console.log(cart.cartItems ?)
    return (
        <div>
            <Menu placement='bottom-end'>
                <MenuHandler>
                    <div className='relative p-2 border rounded-md  border-gray-400 text-gray-500 hover:border-regal-blue hover:text-gray-800 ease-in duration-100 cursor-pointer'>
                        <AiOutlineShopping className='text-2xl text-regal-blue' />
                        {cart.cartItems?.length > 0 && (
                            <div className='absolute -top-2 -right-3 bg-red-800 h-6 w-6 rounded-full flex justify-center items-center '>
                                <div className='text-white text-[12px]'>
                                    {cart.cartItems?.length}
                                </div>
                            </div>
                        )}
                    </div>
                </MenuHandler>
                <MenuList>
                    <div className={`  ${cart.cartItems?.length && 'max-w-[500px]'}`}>
                        {cart.cartItems?.length > 0 ?

                            <div className='flex flex-row justify-between items-center  border-b border-zinc-300 pb-3 mb-3 last:border-0 last:pb-0 last:mb-0'>
                                <h1>Total ({cart.cartItems?.length})</h1>
                                <SeeAllButton route={'/cart'}>Cart</SeeAllButton>
                            </div>
                            :
                            <div className=' p-3 mb-3 border-b border-zinc-300 pb-3  last:border-0 last:pb-0 last:mb-0'>
                                <p className='text-lg text-center '>Cart is empty.</p>
                            </div>

                        }
                        {cart.cartItems?.map((item, idx) => (
                            <div
                                key={item.id + idx}
                                className="grid grid-cols-5 gap-2 border-b border-zinc-300 pb-3 mb-2 last:border-0 last:pb-0 last:mb-0"
                            >
                                <div className="col-span-2">
                                    <Image
                                        src={item.image}
                                        alt={item.id + idx}
                                        width={200}
                                        height={200}
                                        className="w-auto h-auto"
                                    />
                                </div>
                                <div className="col-span-3 flex flex-col justify-between p-1">
                                    <div>
                                        <p
                                            onClick={() => router.push(`/products/${item.id}`)}
                                            className=" text-[14px] hover:underline hover:text-red-800 ease-in duration-75 cursor-pointer"
                                        >
                                            {item.name}
                                        </p>
                                        <p className="text-[14px] font-medium">US M{item.size}</p>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => handleDelete(item.product)}
                                            className="py-2 px-6 bg-red-700 text-white rounded-md"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </MenuList>
            </Menu>
        </div>
    )
}

export default CartMenu
