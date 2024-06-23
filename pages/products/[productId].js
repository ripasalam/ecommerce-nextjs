import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import Layout from '@/components/Layout';
import BackButton from '@/components/button/BackButton';
import axios from 'axios';
import ProductSection from '@/components/section/ProductSection';
import ProductSuggestionSection from '@/components/section/ProductSuggestionSection';
import SmallLoaders from '@/components/loaders/SmallLoaders';
import Loaders from '@/components/loaders/Loaders';

const ProductDetails = () => {
    const router = useRouter()
    const productId = router.query.productId;


    const [product, setProduct] = useState('')


    useEffect(() => {
        // let ignore = false
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}`)
            .then((res) => {

                setProduct(res.data.product)

            }).catch((error) => {
                console.log(error)
            })


    }, [productId]);


    if (!product) {
        return <Loaders />;

    }






    return (
        <Layout>
            <BackButton route={'/'} />
            <ProductSection product={product} />
            <ProductSuggestionSection product={product} key={product.id} />

        </Layout>
    )
}

export default ProductDetails