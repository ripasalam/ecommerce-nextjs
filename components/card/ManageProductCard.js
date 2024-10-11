import React, { useState } from 'react'
import Image from 'next/image'
import { MdOutlineEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'
import { CldImage } from 'next-cloudinary';

Modal.setAppElement('#__next');

const ManageProductCard = ({ product }) => {

    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentId, setCurrentId] = useState(0);

    const diffForHumans = (date) => {
        const now = new Date();
        const newDate = new Date(date);
        const diffInMs = Math.abs(now - newDate);
        const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) {
            return 'today';
        } else if (diffInDays === 1) {
            return 'yesterday';
        } else {
            return `${diffInDays} days ago`;
        }
    };

    const handleUpdate = () => {
        router.push(`edit-product/${product.id}`)
    }

    const handleDelete = (productId) => {



        axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${productId}`, {
            headers: { authorization: 'Bearer ' + Cookies.get('token') },
        })
            .then((res) => {
                toast.success(res.data.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });

                setIsModalOpen(false);
                setCurrentId(0);
                router.push('/manage-product')
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            });
    }

    console.log(product)

    return (
        <div className='grid md:grid-cols-4 gap-3 m-4  p-2 border border-gray-300 bg-gradient-to-tl bg-gray-100 rounded-md'>
            <div className='h-24 w-48 flex  justify-center items-center mb-5'>
                {/* <Image
                    src={product.image}
                    width={0}
                    height={0}
                    sizes="50vw"
                    className='h-auto w-auto object-cover mb-5'
                    alt='product'
                /> */}
                <CldImage
                    width="200"
                    height="200"
                    src={product.image}
                />
            </div>
            <div className='flex flex-col justify-center '>
                <p className="sm:text-[16px] text-[14px] font-semibold">{product.name}</p>
                <p className="sm:text-[16px] text-[14px] font-semibold text-red-800">
                    ${product.price}
                </p>
            </div>
            <div className='flex flex-col justify-center items-center text-sm'>Updated {diffForHumans(product.createdAt)}</div>
            <div className='flex  justify-center items-center gap-2'>
                <button onClick={handleUpdate} className='flex justify-center items-center gap-2 py-2 px-3 border border-gray-300 bg-gradient-to-tl bg-gray-100 rounded-md'>
                    <MdOutlineEdit />
                </button>
                <button onClick={() => {
                    setIsModalOpen(true)
                    setCurrentId(product.id);
                }} className='flex justify-center items-center gap-2 py-2 px-3 border border-gray-300 bg-gradient-to-tl bg-gray-100 rounded-md hover:bg-blue-900'>
                    <FaTrash />
                </button>
            </div>

            {/* Modal Confirmation */}
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal" overlayClassName="modal-overlay">
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-10" />
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-lg transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="flex flex-col items-center">
                                        <div className="mx-auto flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-red-100 ">
                                            <svg className="h-14 w-14 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center">
                                            <h3 className="text-2xl mb-1 font-semibold leading-6 text-gray-900" id="modal-title">
                                                Are you sure?
                                            </h3>
                                            <div className="self-center">
                                                <p className="text-sm text-gray-500">This data will be removed. This action cannot be undone.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={() => {
                                            handleDelete(currentId)
                                        }}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => {
                                            setIsModalOpen(false)
                                            setCurrentId(0);
                                        }
                                        }
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default ManageProductCard
