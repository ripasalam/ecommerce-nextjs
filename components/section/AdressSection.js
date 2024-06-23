import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { create } from "@regions-of-indonesia/client";
import { Region } from "@regions-of-indonesia/types";
import Link from 'next/link';

const client = create();

const AdressSection = ({ isAdd, setIsAdd, isEdit, setIsEdit, currentId, setCurrentId, profile }) => {


    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [subDistrict, setSubDistrict] = useState('')




    useEffect(() => {
        const effect = async () => {
            try {
                setProvince(await client.province.find.by(profile.addresses.province));
                setCity(await client.district.find.by(profile.addresses.city));
                setDistrict(await client.subdistrict.find.by(profile.addresses.district));
                setSubDistrict(await client.village.find.by(profile.addresses.subdistrict));
            } catch (error) {
                console.log(error)
            }
        };

        effect();
    }, [profile]);


    return (
        <div>
            <div>
                <h2 className=' uppercase border-b-2 border-b-blue-gray-100 font-bold mb-7'>Address Information</h2>
            </div>
            <div className='flex flex-wrap'>
                <div className=' w-1/2'>
                    <p className='font-bold mb-3'>Default Billing Address</p>
                    <div className='mb-5'>
                        <p className='mb-1'>{profile.name} </p>
                        <p className='mb-2'>{profile?.addresses?.street} Kel.{subDistrict.name} {district.name} {city.name} {province.name} {profile?.addresses?.postal}  </p>
                        <p> T: {profile?.addresses?.phone} </p>
                    </div>
                    <div className='flex gap-4 mb-32'>
                        {profile.addresses ?
                            <button onClick={() => {
                                setIsEdit({ ...isEdit, address: true })
                                setCurrentId(profile?.addresses?.id)
                            }} className=' underline text-blue-600 cursor-pointer hover:text-black'>Edit Addresss</button> :
                            <button onClick={() => {
                                setIsAdd({ ...isEdit, address: true })
                            }} className=' underline text-blue-600 cursor-pointer hover:text-black'>Add Addresss</button>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdressSection