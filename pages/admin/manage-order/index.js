import AdminLayout from '@/components/adminDashboard/AdminLayout'
import ManageOrder from '@/components/adminDashboard/ManageOrder'
import Layout from '@/components/Layout'
import React from 'react'


const ManageOrderPage = () => {
    return (
        <div>
            <ManageOrder />
        </div>
    )

}

ManageOrderPage.getLayout = (page) => (
    <Layout>
        <AdminLayout>{page}</AdminLayout>
    </Layout>
)

export default ManageOrderPage

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