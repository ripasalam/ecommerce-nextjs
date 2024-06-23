import Layout from '@/components/Layout'
import AccountSection from '@/components/section/AccountSection'
import EditAddressSection from '@/components/section/EditAddressSection'
import React from 'react'

const EditAddressProfile = () => {
    return (
        <Layout>
            <AccountSection>
                <EditAddressSection />
            </AccountSection>
        </Layout>
    )
}

export default EditAddressProfile

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