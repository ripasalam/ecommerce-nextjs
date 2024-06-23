import Layout from '@/components/Layout'
import AccountSection from '@/components/section/AccountSection'
import MyAccountSection from '@/components/section/MyAccountSection'
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const Profile = () => {

    const [isEdit, setIsEdit] = useState({
        profile: false,
        address: false
    })
    const [isAdd, setIsAdd] = useState({
        profile: false,
        address: false
    })

    const token = JSON.stringify(Cookies.get('token'))
    const router = useRouter()


    if (token) {
        const { exp } = jwtDecode(token)
        const expirationTime = (exp * 1000) - 60000

        if (Date.now() >= expirationTime) {
            Cookies.remove('token');
            Cookies.remove('role');
            Cookies.remove('id');
            router.push('/')
        }
    }



    return (
        <Layout isAdd={isAdd} isEdit={isEdit} setIsAdd={setIsAdd} setIsEdit={setIsEdit}>
            <AccountSection>
                <MyAccountSection isAdd={isAdd} isEdit={isEdit} setIsAdd={setIsAdd} setIsEdit={setIsEdit} />
            </AccountSection>

        </Layout>
    )
}

export default Profile

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