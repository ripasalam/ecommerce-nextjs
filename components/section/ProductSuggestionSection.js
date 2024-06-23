import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SeeAllButton from '../button/SeeAllButton';
import ProductGrid from '../ProductGrid';
const ProductSuggestionSection = ({ product }) => {


    const [productCategory, setProductCategory] = useState([])
    const [category, setCategory] = useState([])

    const productId = product.id
    const categoryId = product.categoryId

    useEffect(() => {
        let ignore = false
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/suggesstion`, {
            params: {
                productId,
                categoryId,
                limit: 6
            }
        })
            .then((res) => {
                if (!ignore) {

                    setCategory(res.data.category)
                    setProductCategory(res.data.productCategory)
                }
            }).catch((error) => {
                console.log(error)
            })

        return () => {
            ignore = true
        }

    }, []);




    return (
        <div className='border-t my-5'>
            <div className='my-5 flex justify-between items-center'>
                <h1 className='font-bold text-2xl'>More {category.name}: </h1>
                <SeeAllButton />
            </div>
            <ProductGrid products={productCategory} />
        </div>
    )
}

export default ProductSuggestionSection