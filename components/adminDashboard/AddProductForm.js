import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { DEFAULT_SIZES } from '@/constants';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


const AddProductForm = () => {


    const [size, setSize] = useState([])

    const [input, setInput] = useState({
        nameProduct: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
    })
    const [categories, setCategories] = useState([])
    const [file, setFile] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`)
            .then((res) => {
                setCategories(res.data.categories)
            }).catch((error) => {
                console.log(error)
            })
    }, []);



    const handleChangeInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInput({ ...input, [name]: value })
    }

    const handleSize = (currSize) => {



        if (size.includes(currSize)) {

            setSize(size.filter(curr => curr !== currSize))
            setInput({ ...input, size: size.filter(curr => curr !== currSize) })

        } else {
            setSize(size => [...size, currSize])
            setInput({ ...input, size: currSize })


        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault()


        const formData = new FormData();
        formData.append('photo', file);

        formData.append('nameProduct', input.nameProduct);
        formData.append('description', input.description);
        formData.append('price', input.price);
        formData.append('size', JSON.stringify(size));
        formData.append('quantity', input.quantity);
        formData.append('categoryId', input.category);

        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, formData, {
            headers: {
                authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'multipart/form-data',
            }
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
                setInput({
                    nameProduct: '',
                    description: '',
                    price: '',
                    quantity: '',
                    category: '',
                })
                setSize('')
                setFile(null)

            })
            .catch((error) => {
                console.log(error);
                toast.error(error, {
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




    return (
        <div className='mx-auto items-center my-5 max-w-2xl shadow-lg  '>
            <div className='px-6 py-3 mb-3'>
                <div className='text-center font-bold text-xl'>
                    <h1>Add Product</h1>
                </div>
                <div>
                    <form onSubmit={handleAddProduct} className="space-y-4 md:space-y-6" >
                        <div className="mb-3">
                            <div className="w-full  px-3 mb-6 ">

                                <input type="text" name='nameProduct' value={input.nameProduct} onChange={handleChangeInput} className="block border border-grey-light w-full p-2 rounded " placeholder="Product Name" required />
                            </div>
                            <div className="w-full  px-3 mb-6 ">

                                <input type="text" name='description' value={input.description} onChange={handleChangeInput} className="block border border-grey-light w-full p-2 rounded " placeholder="Description" required />
                            </div>
                            <div className="w-full  px-3 mb-6 ">

                                <input type="number" name='price' value={input.price} onChange={handleChangeInput} className="block border border-grey-light w-full p-2 rounded " placeholder="Price" />
                            </div>
                            <div className="w-full  px-3 mb-6 ">
                                {DEFAULT_SIZES.map((currSize) => (
                                    <div
                                        onClick={() => handleSize(currSize)}
                                        key={currSize}
                                        name="size"
                                        className={`cursor-pointer border border-zinc-300 hover:border-zinc-800 hover:text-zinc-800 p-2 ease-in duration-75 my-5 ${size.includes(currSize) && 'bg-gray-700 text-white hover:text-white'}`}
                                    >
                                        US M {currSize}
                                    </div>
                                ))}
                                {/* <input type="text" name='size' value={input.size} onChange={handleChangeInput} className="block border border-grey-light w-full p-2 rounded " placeholder="Size" /> */}
                            </div>
                            <div className="w-full  px-3 mb-6 ">

                                <input type="number" name='quantity' value={input.quantity} onChange={handleChangeInput} className="block border border-grey-light w-full p-2 rounded " placeholder="Quantity" />
                            </div>
                            <div className="w-full  px-3 mb-6 ">
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                <select name='category' value={input.category} onChange={handleChangeInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose a category</option>
                                    {categories !== null &&
                                        categories.map((category) => (
                                            <option value={category.id}>{category.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='w-full px-3 mb-6'>
                                <input
                                    name="photo"
                                    onChange={(event) => {
                                        setFile(event.target.files[0]);
                                    }}
                                    className="block w-full text-sm text-gray-900 border border-gray-300 p-1 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    type="file"
                                    accept=".jpg, .png"
                                    required
                                />

                            </div>
                        </div>
                        <button type='submit' className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Product</button>
                    </form>
                </div>


            </div>

        </div>
    )
}

export default AddProductForm