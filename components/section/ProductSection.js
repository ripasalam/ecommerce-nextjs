import CartContext from '@/context/CartContext';
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { toast } from 'react-toastify';
import { DEFAULT_SIZES } from '@/constants';



const ProductSection = ({ product }) => {

    const [size, setSize] = useState(null);
    const soldOut = product.quantity === 0
    const { addItemToCart } = useContext(CartContext);

    const addToCartHandler = () => {
        addItemToCart({
            product: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
        });

        toast.success('Successfully added to cart!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const currencyFormat = (value) => {

        const rupiah = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(value)

        return (
            <div>{rupiah}</div>
        )
    }

    console.log(product.sizes)
    console.log(DEFAULT_SIZES)

    if (product.sizes) {
        let result = DEFAULT_SIZES.map(u => product.sizes.includes(u));
        console.log(result)
    }





    return (
        <div className='py-10 border-t-2 border-t-gray-400'>
            <div className='flex lg:flex-row  flex-col justify-center '>
                <div className=' flex-1 justify-center items-center'>
                    <Image src={product.image} alt={product.id} width={350} height={350} />

                </div>
                <div className='flex-1'>
                    <h1 className='text-4xl font-bold mb-5'>{product.name}</h1>
                    <h2 className='text-2xl font-bold text-red-700 mb-8'>{currencyFormat(product.price)}</h2>
                    <p className='text-lg font-bold text-gray-600'>Select size :</p>
                    <div className='flex flex-wrap gap-2 pt-2 pb-5  '>
                        {DEFAULT_SIZES.map((currSize, idx) => (
                            <div onClick={() => (!soldOut) && setSize(currSize)} className={`h-10 w-32 text-center  border-2 border-gray-400 hover:border-black py-2 px-5 ${size === currSize && 'bg-gray-700 text-white hover:text-white'} ${product.sizes ? !product.sizes.includes(currSize) ? 'cursor-not-allowed bg-gray-300 text-gray-500 hover:border-zinc-300 hover:text-zinc-500' : 'cursor-pointer' : ""}`}>US M {currSize}</div>

                        ))
                        }
                    </div>
                    <button onClick={addToCartHandler} disabled={!size} className={`${!size ? ' cursor-not-allowed' : 'cursor-pointer'} my-5 flex items-center justify-center px-6 py-3 text-[14px] rounded-md text-white bg-gray-800 border border-gray-400 hover:bg-gray-900`}>
                        <IoIosAddCircle className="text-xl mr-1" />
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className='border-t '>
                <div className='mt-5'>
                    <h1 className='font-bold text-2xl'>About The Sneakers:</h1>
                    <p className='text-gray-700'>{product.description}</p>
                </div>

            </div>
        </div >
    )
}

export default ProductSection