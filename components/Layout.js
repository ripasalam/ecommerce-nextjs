import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { CartProvider } from '@/context/CartContext'

const Layout = ({ children, isAdd, isEdit, setIsAdd, setIsEdit }) => {
    return (
        <CartProvider>
            <div className='max-w-screen-4xl mx-auto px-8 md:px-16 flex flex-col'>
                <Header isAdd={isAdd} isEdit={isEdit} setIsAdd={setIsAdd} setIsEdit={setIsEdit} />
                {children}
                <Footer />
            </div>
        </CartProvider>
    )
}

export default Layout
