import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const AdminHead = () => {


    const pathname = usePathname();


    return (
        <div className=''>
            <div className='grid grid-flow-col z-0'>
                <div className='flex col-start-2 items-center gap-5'>

                    <Link
                        className={`admin-nav  text-center cursor-pointer link ${pathname === '/admin' ? 'admin-nav-active' : 'text-dark-900'}`}
                        href="/admin"
                    >
                        Summary
                    </Link>
                    <Link
                        className={`admin-nav  text-center cursor-pointer link ${pathname === '/admin/add-product' ? 'admin-nav-active' : 'text-dark-900'}`}
                        href="/admin/add-product"
                    >
                        Add Product
                    </Link>
                    <Link
                        className={`admin-nav  text-center cursor-pointer link ${pathname === '/admin/manage-product' ? 'admin-nav-active' : 'text-dark-900'}`}
                        href="/admin/manage-product"
                    >
                        Manage Product
                    </Link>
                    <Link
                        className={`admin-nav  text-center cursor-pointer link ${pathname === '/admin/manage-order' ? 'admin-nav-active' : 'text-dark-900'}`}
                        href="/admin/manage-order"
                    >
                        Manage Order
                    </Link>

                </div>

            </div>


        </div>
    )
}

export default AdminHead