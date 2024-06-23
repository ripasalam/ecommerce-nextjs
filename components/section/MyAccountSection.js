import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import AdressSection from './AdressSection'
import EditAddressSection from './EditAddressSection'
const MyAccountSection = ({ isAdd, isEdit, setIsAdd, setIsEdit }) => {



    const [profile, setProfile] = useState('')
    const [currentId, setCurrentId] = useState(0)


    useEffect(() => {

        let ignore = false
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
            headers: { Authorization: 'Bearer ' + Cookies.get('token') }
        })
            .then((res) => {
                if (!ignore) {
                    setProfile(res.data.profile)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        return () => {
            ignore = true
        }
    }, [isAdd.address, isEdit.address])





    return (
        <div className='bg-white ml-5'>
            {!isEdit.address && !isAdd.address &&
                <div>
                    <div className=''>
                        <div>
                            <h2 className=' uppercase border-b-2 border-b-blue-gray-100 font-bold mb-7'>Account Information</h2>
                        </div>
                        <div className='flex'>
                            <div className='flex-1'>
                                <p className='font-bold mb-3'>Contact Information</p>
                                <p className='mb-1'>{profile.name} </p>
                                <p className='mb-5'>{profile.email}</p>
                                <div className='flex gap-4 mb-32'>
                                    <p className=' underline text-blue-600 cursor-pointer hover:text-black'>Edit</p>
                                    <p className='underline text-blue-600 cursor-pointer hover:text-black'>Change Password</p>

                                </div>
                            </div>
                            {/* <div className='flex-1'>
                        <p className='font-bold'>NewsLetter</p>
                        <p>Youre not </p>
                    </div> */}

                        </div>
                    </div>
                    <AdressSection isAdd={isAdd} setIsAdd={setIsAdd} isEdit={isEdit} setIsEdit={setIsEdit} currentId={currentId} setCurrentId={setCurrentId} profile={profile} />

                </div>
            }
            {isAdd.address && !isEdit.address && <EditAddressSection isAdd={isAdd} setIsAdd={setIsAdd} isEdit={isEdit} setIsEdit={setIsEdit} currentId={currentId} setCurrentId={setCurrentId} profile={profile} key={profile.id} />}
            {!isAdd.address && isEdit.address && <EditAddressSection isAdd={isAdd} setIsAdd={setIsAdd} isEdit={isEdit} setIsEdit={setIsEdit} currentId={currentId} setCurrentId={setCurrentId} profile={profile} key={profile.id} />}

        </div>
    )
}

export default MyAccountSection