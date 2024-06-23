import Link from 'next/link'
import React from 'react'

const AccountSection = ({ children }) => {
    return (

        <div className="flex flex-row flex-nowrap ">
            <div className={'  w-[208px] basis-auto  flex bg-white p-4 pr-10 border-r border-gray-200'}>
                <nav className="flex flex-col gap-4">
                    <div>
                        <Link href='account'>
                            <p> My Account</p>
                        </Link>

                    </div>
                    <div>
                        <Link href='/order-list'>
                            <p> Order</p>
                        </Link>

                    </div>

                </nav>
            </div>
            {/* end of sidebar */}

            {/* main content */}
            <div className={'basis-full ml-20'}>{children}</div>
            {/* main content */}
        </div>

    )
}

export default AccountSection