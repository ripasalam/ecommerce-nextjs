import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ManageProductCard from '../card/ManageProductCard';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const ManageProduct = () => {

    const [products, setProducts] = useState([]);

    const router = useRouter()

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, {
            headers: { authorization: 'Bearer ' + Cookies.get('token') }
        })
            .then((res) => {
                setProducts(res.data.products)
            }).catch((error) => {
                console.log(error)
            })
    }, []);


    return (
        <div className='py-10'>
            <div className='flex justify-end'>
                <button onClick={() => router.push('/admin/add-product')} className='flex items-center justify-center px-6 py-3 text-[14px] rounded-md text-gray-600 border border-gray-400 hover:bg-gray-200'>AddProduct</button>
            </div>
            {products !== null &&
                products.map((product) => (
                    <ManageProductCard key={product.id} product={product} />
                ))

            }

        </div>
    )
}

export default ManageProduct
