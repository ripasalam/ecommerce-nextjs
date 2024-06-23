import React from 'react'
import { useRouter } from 'next/router'
import { IoArrowForwardOutline } from 'react-icons/io5'

const SeeAllButton = ({ children, route }) => {
    const router = useRouter()

    const handleclick = (e) => {
        e.preventDefault()
        router.push(route)
    }
    return (
        <button onClick={handleclick} className=' flex items-center justify-center px-6 py-3 text-[14px] rounded-md text-gray-600 border border-gray-400 hover:bg-gray-200'>
            {children ?? 'See All'}
            <IoArrowForwardOutline className='text-xl ml-1' />
        </button>
    )
}

export default SeeAllButton
