import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const RegisterSection = () => {

    const router = useRouter()

    const [input, setInput] = useState({
        name: '',
        email: '',
        emailVerified: '',
        password: '',
        confirmPassword: '',
    })

    const handleChangeInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInput({ ...input, [name]: value })
    }



    const handleRegister = async (e) => {
        e.preventDefault()


        if (input.email === input.emailVerified) {
            if (input.password === input.confirmPassword) {
                await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/register`, input)
                    .then((res) => {

                        toast.success('Register Successfully!', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });

                        router.push('/login')

                    })
                    .catch((error) => {

                        toast.error(`${error.response?.data?.message
                            }`, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    })
            } else {
                console.log('Password doesnt match')
            }
        } else {
            console.log('Email doesnt match')
        }
    }


    return (
        <>
            <div className=" flex flex-col ">
                <div className="container max-w-xl mx-auto flex flex-col px-2 my-10 justify-center">
                    <div className="bg-white px-6 py-8 rounded shadow-md">
                        <h1 className="mb-6 text-2xl text-center text-gray-900"> Sign Up</h1>
                        <form onSubmit={handleRegister} className=" w-full max-w-lg" >
                            <div className="mb-3">
                                <div className="w-full  px-3 mb-6 md:mb-0">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Full Name</label>
                                    <input type="text" name='name' value={input.name} onChange={handleChangeInput} className="block border border-grey-light w-full p-2 rounded " placeholder="Full Name" />
                                </div>
                                <div className="w-full  px-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                    <input
                                        type="text"
                                        className="block border border-grey-light w-full p-2 rounded "
                                        name="email"
                                        value={input.email}
                                        onChange={handleChangeInput}
                                        placeholder="Email"
                                        required={true}
                                    />
                                </div>
                                <div className="w-full  px-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Email</label>
                                    <input
                                        type="text"
                                        className="block border border-grey-light w-full p-2 rounded "
                                        name="emailVerified"
                                        value={input.emailVerified}
                                        onChange={handleChangeInput}
                                        placeholder="Confirm Email"
                                        required
                                    />
                                </div>
                                <div className="w-full  px-3 mb-6 md:mb-0">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input
                                        type="password"
                                        className="block border border-grey-light w-full p-2 rounded "
                                        name="password"
                                        value={input.password}
                                        onChange={handleChangeInput}
                                        required
                                    />
                                </div>
                                <div className="w-full  px-3 mb-6 md:mb-0">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="block border border-grey-light w-full p-2 rounded "
                                        name="confirmPassword"
                                        value={input.confirmPassword}
                                        onChange={handleChangeInput}
                                        required
                                    />
                                </div>
                            </div>
                            <button type='submit' className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</button>
                            <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                                Already have an account ?{' '}
                                <Link href="/login" className="font-medium text-blue-500 hover:underline dark:text-primary-500">
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterSection