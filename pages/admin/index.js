import AdminLayout from '@/components/adminDashboard/AdminLayout'
import Summary from '@/components/adminDashboard/Summary'
import Layout from '@/components/Layout'
import React from 'react'

const Admin = () => {
    return (
        <div>
            <Summary />
        </div>
    )

}

Admin.getLayout = (page) => (
    <Layout>
        <AdminLayout>{page}</AdminLayout>
    </Layout>

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