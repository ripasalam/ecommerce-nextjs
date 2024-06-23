import Layout from '@/components/Layout'
import OrderListSection from '@/components/section/OrderListSection'
import React from 'react'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'


const OrderHistory = () => {

    return (
        <Layout>
            <OrderListSection />
        </Layout>
    )
}

export default OrderHistory

export const getServerSideProps = async (context) => {
    const { role, token } = context.req.cookies;



    if (token) {
        const { exp } = jwtDecode(token)
        const expirationTime = (exp * 1000) - 60000

        if (Date.now() >= expirationTime) {
            Cookies.remove('token');
            Cookies.remove('role');
            Cookies.remove('id');
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        }
    }

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    // if (role !== 'Admin') {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: true,
    //         },
    //     };
    // }

    return {
        props: {
            role,
        },
    };
};