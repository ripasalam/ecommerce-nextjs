import SmallLoaders from '@/components/loaders/SmallLoaders'
import NotFoundText from '@/components/NotFoundText'
import ProductGrid from '@/components/ProductGrid'
import axios from 'axios'
import React, { useState, useEffect } from 'react'


const SearchProductSection = ({ search }) => {

    // console.log(search)

    const [products, setProducts] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerpage] = useState(12)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        let ignore = false
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, {
            params: {
                search,
                currentPage,
                perPage
            }
        })
            .then((res) => {
                if (!ignore) {
                    console.log('test')
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

    }, [search, currentPage, perPage]);


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


    if (!products) {
        return <NotFoundText>Product Not Found </NotFoundText>
    }

    if (isLoading) {
        return <SmallLoaders />
    }

    return (
        <div>
            <ProductGrid products={products} />
            <div className='flex justify-center mt-10'>{renderPagination()}</div>
        </div>
    )
}

export default SearchProductSection