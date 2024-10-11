import React, { useEffect, useState } from 'react'
import ProductCard from './card/ProductCard'
import axios from 'axios';
import NotFoundText from './NotFoundText';


const ProductGrid = ({ products }) => {

    if (!products) {
        return <NotFoundText>Product Not Found </NotFoundText>
    }

    return (
        <div className='mx-auto max-w-7xl w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-5'>
            {products !== null &&
                products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))
            }


        </div>
    )
}

export default ProductGrid 
