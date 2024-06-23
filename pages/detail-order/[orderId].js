import Layout from '@/components/Layout'
import DetailOrderSection from '@/components/section/DetailOrderSection'
import React from 'react'

const DetailOrder = () => {
    return (
        <Layout>
            <DetailOrderSection />
        </Layout>
    )
}

export default DetailOrder

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