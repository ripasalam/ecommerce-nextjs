import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';
import Layout from '@/components/Layout';
import BackButton from '@/components/button/BackButton';
import Image from 'next/image';
import ProductGrid from '@/components/ProductGrid';
import Loaders from '@/components/loaders/Loaders';
import SmallLoaders from '@/components/loaders/SmallLoaders';


const categories = () => {
    const router = useRouter()
    const categoryId = router.query.category;

    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/${categoryId}`, categoryId)
            .then((res) => {
                setCategory(res.data.category)
                setProducts(res.data.productCategory)
                setTimeout(() => {
                    setIsLoading(false);
                }, 200)
            }).catch((error) => {
                console.log(error)
            })
    }, [categoryId]);

    if (isLoading) {
        return <Loaders />
    }


    return (
        <Layout>
            <BackButton route={'/'} />
            <div className=' border-t-2 border-t-gray-400 py-10'>
                <div className='flex justify-between items-center py-10'>
                    <div className='flex flex-1 justify-center'>
                        <Image src={category.image} width={500} height={500} className='h-auto w-auto' />
                    </div>
                    <div className=' flex-1'>
                        <h1 className='text-2xl text-red-700 font-bold'>{category.name}</h1>
                        <p>{category.description}</p>
                    </div>
                </div>
                <div className='border-t-2 border-t-gray-400 py-10'>
                    <h3 className=' text-2xl font-bold text-gray-900 pb-5'>All Available {category.name}</h3>
                    <ProductGrid products={products} />
                </div>
            </div>

        </Layout>
    )
}

export default categories
