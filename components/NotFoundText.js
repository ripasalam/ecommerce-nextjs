import React from 'react'

const NotFoundText = ({ children }) => {
    return (
        <div className=' h-[40vh] w-full mx-auto max-w-6xl flex justify-center items-center'>
            <h2 className='my-10 text-2xl font-black text-zinc-400'>
                {children ?? 'Notfound.'}
            </h2>
        </div>
    )
}

export default NotFoundText