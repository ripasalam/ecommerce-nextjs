import React from 'react'

const Footer = () => {
    return (
        <div className='border-t-2 border-t-gray-400 z-30'>
            <div className='p-5 grid md:grid-cols-4'>
                <div>
                    <h3 className=' uppercase mb-5 font-bold'>Tentang</h3>
                    <ul className=' space-y-3'>
                        <li className=' cursor-pointer hover:text-gray-700'>Tentang Kami</li>
                        <li className=' cursor-pointer hover:text-gray-700'  >Syarat Dan Ketentuan</li>
                        <li className=' cursor-pointer hover:text-gray-700'>Kebijakan Privasi</li>
                    </ul>
                </div>
                <div>
                    <h3 className=' uppercase mb-5 font-bold'>Layanan Pelanggan</h3>
                    <ul className=' space-y-3'>
                        <li className=' cursor-pointer hover:text-gray-700'>FAQs</li>
                        <li className=' cursor-pointer hover:text-gray-700'>Pengembalian</li>
                        <li className=' cursor-pointer hover:text-gray-700'>Kontak Kami</li>
                        <li className=' cursor-pointer hover:text-gray-700'>Peta Situs</li>
                    </ul>
                </div>
                <div>
                    <h3 className=' uppercase mb-5 font-bold'>Link Populer</h3>
                    <ul className=' space-y-3'>
                        <li className=' cursor-pointer hover:text-gray-700'>Sepatu Pria</li>
                        <li className=' cursor-pointer hover:text-gray-700'>Sepatu Wanita</li>
                        <li className=' cursor-pointer hover:text-gray-700'>Sneakers Pria</li>
                        <li className=' cursor-pointer hover:text-gray-700'>Sneakers Wanita</li>
                    </ul>
                </div>
                <div>
                    <div>
                        <form className='flex gap-2 mb-5'>
                            <input class=" text-sm border rounded w-full py-2 px-3 text-gray-700  focus:outline-none" type="text" placeholder="Masukkan Alamat Email Anda" />
                            <button className='p-2 bg-black text-white font-bold'>Daftar Sekarang</button>
                        </form>
                        <p className='text-justify'>Dengan berlangganan, Anda setuju untuk menerima komunikasi apapun dari kami dan Anda telah membaca <u>Kebijakan Privasi</u> dan <u>syarat & ketentuan kami.</u></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
