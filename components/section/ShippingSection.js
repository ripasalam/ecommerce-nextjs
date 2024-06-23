import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { create } from "@regions-of-indonesia/client";
import { Region } from "@regions-of-indonesia/types";

const client = create();

const ShippingSection = () => {

    const [profile, setProfile] = useState([])
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [subDistrict, setSubDistrict] = useState('')
    // const [addresses, setAddresses] = useState([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
            headers: { Authorization: 'Bearer ' + Cookies.get('token') }
        })
            .then((res) => {

                setProfile(res.data.profile)
                // setAddresses(res.data.profile.addresses)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])


    const handleCity = (data) => {


        useEffect(() => {
            const effect = async () => {
                try {

                    setCity(await client.district.find.by(profile.addresses.city));
                } catch (error) {
                    console.log(error)
                }
            };

            effect();
        }, [profile]);

        return (

            <p>{city.name} </p>

        )


    }

    const handleDistrict = (data) => {


        useEffect(() => {
            const effect = async () => {
                try {

                    setDistrict(await client.subdistrict.find.by(profile.addresses.district));
                } catch (error) {
                    console.log(error)
                }
            };

            effect();
        }, [profile]);

        return (

            <p>{district.name} </p>

        )


    }

    const handleSubDistrict = (data) => {


        useEffect(() => {
            const effect = async () => {
                try {

                    setSubDistrict(await client.village.find.by(profile.addresses.subdistrict));
                } catch (error) {
                    console.log(error)
                }
            };

            effect();
        }, [profile]);

        return (

            <p>{subDistrict.name} </p>

        )


    }

    return (
        <div>
            <h1 className='text-2xl font-bold mb-5 border-b-2 border-b-gray-400 py-5'>Shipping Address</h1>
            <div className='flex flex-wrap'>

                <div className='p-3 border-2 border-gray-400 mb-2 mr-5'>
                    <p>{profile.name}</p>
                    <p className='flex'>{profile.addresses?.street} &nbsp; Kel.&nbsp; {handleSubDistrict(profile.addresses?.subdistrict)}&nbsp;  {handleDistrict(profile.addresses?.district)} &nbsp; {handleCity(profile.addresses?.city)}</p>

                    <p>{profile.addresses?.country}</p>
                    <p>{profile.addresses?.phone}</p>
                </div>

            </div>

        </div>
    )
}

export default ShippingSection