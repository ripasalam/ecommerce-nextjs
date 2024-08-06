import AdminLayout from '@/components/adminDashboard/AdminLayout'
import ManageProduct from '@/components/adminDashboard/ManageProduct'
import Layout from '@/components/Layout'
import React from 'react'


const AddProduct = () => {
    return (
        <div>
            <ManageProduct />
        </div>
    )

}

AddProduct.getLayout = (page) => (
    <Layout>
        <AdminLayout>{page}</AdminLayout>
    </Layout>
)

export default AddProduct

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