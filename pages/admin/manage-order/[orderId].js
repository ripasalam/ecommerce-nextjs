import Layout from '@/components/Layout'
import ManageOrderDetail from '@/components/adminDashboard/ManageOrderDetail'
import React from 'react'
import { useRouter } from 'next/router';

const manageOrderDetail = () => {

    const router = useRouter()
    const orderId = router.query.orderId;

    return (
        <Layout>
            <ManageOrderDetail orderId={orderId} key={orderId} />
        </Layout>
    )
}

export default manageOrderDetail

export const getServerSideProps = async (context) => {
    const { role, token } = context.req.cookies;

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: true,
            },
        };
    }

    if (role !== 'Admin') {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            },
        };
    }

    return {
        props: {
            role,
        },
    };
};
