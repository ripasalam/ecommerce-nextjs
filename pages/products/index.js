import BackButton from '@/components/button/BackButton'
import Layout from '@/components/Layout'
import ProductsSection from '@/components/section/ProductsSection'
import React from 'react'

const AllProduct = () => {
    return (
        <Layout>
            <BackButton route={'/'} />
            <ProductsSection />
        </Layout>

    )
}

export default AllProduct