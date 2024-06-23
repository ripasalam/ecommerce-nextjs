import React, { useEffect, useState } from 'react'
import { create } from "@regions-of-indonesia/client";
import { Region } from "@regions-of-indonesia/types";
import axios from 'axios';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

const client = create();

const EditProfileSection = ({ isAdd, setIsAdd, isEdit, setIsEdit, currentId, setCurrentId, profile }) => {

    // const [input, setInput] = useState({
    //     street: '',
    //     country: 'Indonesia',
    //     province: '',
    //     city: '',
    //     district: '',
    //     subdistrict: '',
    //     postal: '',
    //     phone: '',
    // })





    // const [provinces, setProvinces] = useState([]);
    // const [districts, setDistricts] = useState([]);
    // const [subDistricts, setSubDistricts] = useState([]);
    // const [villages, setVillages] = useState([]);

    // useEffect(() => {

    //     if (isEdit) {

    //         const effect = async () => {
    //             await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/address/${currentId}`, {
    //                 headers: { Authorization: 'Bearer ' + Cookies.get('token') }
    //             })
    //                 .then((res) => {

    //                     setInput({
    //                         street: res?.data?.address?.street,
    //                         country: 'Indonesia',
    //                         province: res?.data?.address?.province,
    //                         city: res?.data?.address?.city,
    //                         district: res?.data?.address?.district,
    //                         subdistrict: res?.data?.address?.subdistrict,
    //                         postal: res?.data?.address?.postal,
    //                         phone: res?.data?.address?.phone,
    //                     })

    //                 })
    //                 .catch((error) => {
    //                     console.log(error)
    //                 })
    //         };

    //         effect();

    //     }
    // }, [isEdit]);

    // const handleChange = (event) => {
    //     const name = event.target.name
    //     const value = event.target.value

    //     setInput({ ...input, [name]: value })
    // }


    // useEffect(() => {
    //     const effect = async () => {
    //         try {
    //             setProvinces(await client.province.find());
    //             setDistricts(await client.district.find(input.province));
    //             setSubDistricts(await client.subdistrict.find(input.city));
    //             setVillages(await client.village.find(input.district));
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     };

    //     effect();
    // }, [input.province, input.city, input.district]);


    // const handleSubmitAddress = (e) => {
    //     e.preventDefault()
    //     if (currentId === 0) {
    //         axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/address`, input, {
    //             headers: { Authorization: 'Bearer ' + Cookies.get('token') }
    //         })
    //             .then((res) => {

    //                 toast.success('Add Address Successfully!', {
    //                     position: "top-center",
    //                     autoClose: 3000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                 });
    //                 setIsAdd(false)
    //             })
    //             .catch((error) => {
    //                 console.log(error)
    //                 toast.error(`${error.response?.data?.message
    //                     }`, {
    //                     position: "top-center",
    //                     autoClose: 3000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                 });
    //             })
    //     } else {
    //         axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/user/address`, { currentId, input }, {
    //             headers: { Authorization: 'Bearer ' + Cookies.get('token') }
    //         })
    //             .then((res) => {

    //                 toast.success('Edit Address Successfully!', {
    //                     position: "top-center",
    //                     autoClose: 3000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                 });
    //                 setIsEdit(false)
    //             })
    //             .catch((error) => {
    //                 console.log(error)
    //                 toast.error(`${error.response?.data?.message
    //                     }`, {
    //                     position: "top-center",
    //                     autoClose: 3000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                 });
    //             })
    //     }

    // }

    // console.log(input)

    return (
        <div>
            <div className='mb-10'>
                <h1 className='pb-5 border-b-2 border-b-gray-200 uppercase font-bold text-xl'>Contact Information</h1>
            </div>
            {/* <div>
                <h1 className='pb-5 border-b-2 border-b-gray-200 uppercase font-bold text-xl'>Address</h1>
                <form onSubmit={handleSubmitAddress}>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street Address</label>
                        <input name='street' value={input.street} onChange={handleChange} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                        <input name='country' disabled={true} value="Indonesia" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State/Province</label>
                        <select name='province' value={input.province} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option selected>Please Select a region, state or province.</option>
                            {provinces.map((province) => (
                                <option value={province.code}>{province.name}</option>
                            ))}

                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                        <select name='city' value={input.city} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option selected>Please Select city.</option>
                            {districts.map((district) => (
                                <option value={district.code}>{district.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">District</label>
                        <select name='district' value={input.district} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option selected>Please Select district.</option>
                            {subDistricts.map((subdistrict) => (
                                <option value={subdistrict.code}>{subdistrict.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">subdistrict</label>
                        <select name='subdistrict' value={input.subdistrict} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option selected>Please Select subdistrict.</option>
                            {villages.map((village) => (
                                <option value={village.code}>{village.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zip/Postal Code</label>
                        <input name='postal' value={input.postal} onChange={handleChange} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                        <input name='phone' value={input.phone} onChange={handleChange} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                    </div>
                    <button type='submit' className='text-white px-5 py-3 bg-black font-semibold'>Save Address</button>
                </form>

            </div> */}
        </div>
    )
}

export default EditProfileSection