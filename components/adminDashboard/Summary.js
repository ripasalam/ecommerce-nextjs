import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'

const Summary = () => {

    const [stats, setStats] = useState([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin`, {
            headers: { authorization: 'Bearer ' + Cookies.get('token') }
        })
            .then((res) => {
                setStats(res.data)
            }).catch((error) => {
                console.log(error)
            })
    }, []);

    console.log(stats)

    const data = [stats].map(x => x)

    console.log(data)

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    return (
        <div className=' mx-auto max-w-2xl my-10'>
            <div className='flex justify-center'>Stats</div>
            <div className='grid grid-cols-2 gap-3 overflow-y-auto max-h-50vh'>
                <div className='rounded-xl border p-4 flex flex-col items-center transition '>
                    <div className='text-xl md:text-4xl font-bold'>
                        {rupiah(stats.totalSale)}
                    </div>
                    <div>
                        Total Sale
                    </div>

                </div>
                <div className='rounded-xl border p-4 flex flex-col items-center transition '>
                    <div className='text-xl md:text-4xl font-bold'>
                        {stats.product}
                    </div>
                    <div>
                        Total Products
                    </div>

                </div>
                <div className='rounded-xl border p-4 flex flex-col items-center transition '>
                    <div className='text-xl md:text-4xl font-bold'>
                        {stats.order}
                    </div>
                    <div>
                        Total Order
                    </div>

                </div>
                <div className='rounded-xl border p-4 flex flex-col items-center transition '>
                    <div className='text-xl md:text-4xl font-bold'>
                        {stats.paidOrder}
                    </div>
                    <div>
                        Total Paid Order
                    </div>

                </div>
                <div className='rounded-xl border p-4 flex flex-col items-center transition '>
                    <div className='text-xl md:text-4xl font-bold'>
                        {stats.unpaidOrder}
                    </div>
                    <div>
                        Total Unpaid Order
                    </div>

                </div>
                <div className='rounded-xl border p-4 flex flex-col items-center transition '>
                    <div className='text-xl md:text-4xl font-bold'>
                        {stats.user}
                    </div>
                    <div>
                        Total User
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Summary