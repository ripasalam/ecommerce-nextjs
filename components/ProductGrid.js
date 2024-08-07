import React, { useEffect, useState } from 'react'
import ProductCard from './card/ProductCard'
import axios from 'axios';

const ProductGrid = ({ products }) => {

    return (
        <div className=' mx-auto max-w-6xl w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1'>
            {products !== null &&
                products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))
            }


        </div>
    )
}

export default ProductGrid 
