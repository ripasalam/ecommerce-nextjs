import AdminLayout from '@/components/adminDashboard/AdminLayout'
import EditProductForm from '@/components/adminDashboard/EditProductForm'
import React from 'react'

const EditProduct = () => {
    return (
        <div>
            <EditProductForm />
        </div>
    )

}

EditProduct.getLayout = (page) => (
    <AdminLayout>{page}</AdminLayout>
)


export default EditProduct

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
