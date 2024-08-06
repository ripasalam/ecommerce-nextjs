import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Logo from './Logo'
import CartMenu from './menus/CartMenu'
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { RiArrowDropDownLine, RiLogoutBoxRLine, RiSettings4Line, RiAlignJustify } from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import SearchSection from './section/SearchSection/SearchSection';


const Header = ({ isAdd, isEdit, setIsAdd, setIsEdit }) => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false)

    const token = Cookies.get('token')
    const role = Cookies.get('role')


    const pathname = usePathname()

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    useEffect(() => {
        if (token) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }

    }, [token]);

    const token1 = JSON.stringify(Cookies.get('token'))


    if (token1) {
        const { exp } = jwtDecode(token1)
        const expirationTime = (exp * 1000) - 60000

        if (Date.now() >= expirationTime) {
            Cookies.remove('token');
            Cookies.remove('role');
            Cookies.remove('id');
            router.push('/')
        }
    }






    return (
        <div className='flex flex-col bg-white py-5 top-0 sticky z-50'>
            <div className='w-full'>
                <div className='flex justify-between items-center justify-center'>
                    <div className='flex items-center'>
                        <div className=' mr-2 '>
                            <Link href={'/'}>
                                <Logo />
                            </Link>

                        </div>
                        <div className='col-start-5 col-end-8 flex items-center'>
                            <SearchSection />
                            {/* <Link href={'/'}>
                            <h1 className='font-bold text-regal-blue'>Popular Products</h1>

                        </Link> */}
                        </div>

                    </div>
                    <div className=' flex items-center gap-2 '>
                        {isLogin ? (
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button className="flex items-center  text-sm font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                                        <span className="sr-only">Open user menu</span>
                                        {/* <p>{!profile.name !== null && profile.name?.split(' ')[0]}</p> */}
                                        <CgProfile size={20} />
                                        <RiArrowDropDownLine size={30} />
                                    </Menu.Button>
                                </div>
                                <Transition

                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg  focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link href="/customer/account" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                    <div className="flex">
                                                        <CgProfile size={20} />
                                                        <p className=" ml-2">Profile</p>
                                                    </div>
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        {role === "Admin" ?
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link href="/admin" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                        <div className="flex">
                                                            <CgProfile size={20} />
                                                            <p className=" ml-2">Admin Dashboard</p>
                                                        </div>
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            :
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link href="/order-list" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                        <div className="flex">
                                                            <CgProfile size={20} />
                                                            <p className=" ml-2">My Purchase</p>
                                                        </div>
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        }

                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link href="/change-password" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                    <div className="flex">
                                                        <RiSettings4Line size={20} />
                                                        <p className=" ml-2">Change Password</p>
                                                    </div>
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href="/"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    onClick={() => {
                                                        Cookies.remove('token');
                                                        Cookies.remove('role');
                                                        Cookies.remove('id');
                                                    }}
                                                >
                                                    <div className="flex">
                                                        <RiLogoutBoxRLine size={20} />
                                                        <p className=" ml-2">Sign out</p>
                                                    </div>
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        ) :
                            (
                                <Link href='/login'>
                                    <div className='px-5 py-2 text-white bg-blue-gray-800 rounded-lg'>Sign In</div>
                                </Link>

                            )
                        }


                        <CartMenu />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Header
