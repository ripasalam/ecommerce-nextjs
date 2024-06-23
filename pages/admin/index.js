import AdminLayout from '@/components/adminDashboard/AdminLayout'
import React from 'react'

const Admin = () => {
    return <div>Admin</div>

}

Admin.getLayout = (page) => (
    <AdminLayout>{page}</AdminLayout>
)

export default Admin

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