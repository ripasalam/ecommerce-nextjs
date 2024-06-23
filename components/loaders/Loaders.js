import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Loaders = () => {
    return (
        <div className=' z-40 h-screen w-screen flex justify-center item-center '>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
            />
        </div>
    )
}

export default Loaders