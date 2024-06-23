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
        <div className='py-10'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Popular sneakers</h1>
                <SeeAllButton route='/products' />
            </div>
            <div className='pt-16'>
                <ProductGrid products={products} />
            </div>
        </div>
    )
}

export default PopularProductSection
