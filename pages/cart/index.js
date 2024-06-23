import BackButton from '@/components/button/BackButton'
import Layout from '@/components/Layout'
import CartSection from '@/components/section/CartSection'
import React from 'react'

const Cart = () => {
    return (
        <Layout>
            <BackButton route={'/'} />
            <CartSection />
        </Layout>

    )
}

export default Cart