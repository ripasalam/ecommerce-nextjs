import React from 'react'
import { useRouter } from 'next/router'
import { IoArrowBackOutline } from 'react-icons/io5'

const BackButton = ({ children, route }) => {
    const router = useRouter()

    // const handleclick = (e) => {
    //     e.preventDefault()
    //     router.back()
    // }
    return (
        <div>
            <button onClick={() => router.back()} className='my-10 flex items-center justify-center px-6 py-3 text-[14px] rounded-md text-gray-600 border border-gray-400 hover:bg-gray-200'>
                <IoArrowBackOutline className='text-xl mr-1' />
                {children ?? 'Back'}
            </button>
        </div>

    )
}

export default BackButton
