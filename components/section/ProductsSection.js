import React, { useEffect, useState } from 'react'
import SeeAllButton from '../button/SeeAllButton'
import ProductGrid from '../ProductGrid'
import axios from 'axios'
import SmallLoaders from '../loaders/SmallLoaders'

const ProductsSection = () => {

    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerpage] = useState(12)
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        let ignore = false
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, {
            params: {
                currentPage,
                perPage
            }
        })
            .then((res) => {
                if (!ignore) {
                    setProducts(res.data.products)
                    setTotalPages(res.data.totalPages)
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 200);
                }
            }).catch((error) => {
                console.log(error)
            })

        return () => {
            ignore = true
        }

    }, [currentPage, perPage]);

    const handlePageChange = (page) => {

        setCurrentPage(page)

    }






    const renderPagination = () => {
        const pages = []

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button onClick={() => handlePageChange(i)} className={`flex border px-4 py-2 rounded-md ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}>
                    {i}
                </button>
            )


        }

        return (
            <div className='flex gap-4'>{pages}</div>
        )


    }

    if (isLoading) {
        return <SmallLoaders />
    }



    return (
        <div className='py-10'>

            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>All product Available : </h1>
            </div>
            <div className='pt-16'>
                <ProductGrid products={products} />
            </div>
            <div className='flex justify-center mt-10'>{renderPagination()}</div>
        </div>
    )
}

export default ProductsSection
