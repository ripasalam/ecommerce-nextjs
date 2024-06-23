import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const SmallLoaders = () => {
    return (
        <div className=' z-40  flex justify-center item-center py-40 '>
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

export default SmallLoaders