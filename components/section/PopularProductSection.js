import React, { useEffect, useState } from 'react'
import SeeAllButton from '../button/SeeAllButton'
import ProductGrid from '../ProductGrid'
import axios from 'axios'



const PopularProductSection = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        let ignore = false
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products`)
            .then((res) => {
                if (!ignore) {
                    setProducts(res.data.products)
                }
            }).catch((error) => {
                console.log(error)
            })

        return () => {
            ignore = true
        }

    }, []);



    return (
        <div className='sm:mx-3 px-2 sm:py-10 py-5'>
            <div className='mx-auto max-w-7xl flex flex-row items-center justify-between mb-4'>
                <h1 className='text-2xl font-bold'>Popular sneakers</h1>
                <SeeAllButton route='/products' />
            </div>
            <div className='pt-16 mx-auto max-w-7xl flex flex-row items-center'>
                <ProductGrid products={products} />
            </div>
        </div>
    )
}

export default PopularProductSection
