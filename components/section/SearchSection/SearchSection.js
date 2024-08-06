import NotFoundText from '@/components/NotFoundText';
import { Dialog, DialogBody } from '@material-tailwind/react';
import axios from 'axios';
import React, { useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import SearchProductSection from './SearchProductSection';


const SearchSection = () => {

    const [open, setOpen] = useState(false)
    const [inputSearch, setInputSearch] = useState('')
    const [searchValue, setSearchValue] = useState('')

    const handleOpen = () => {
        setOpen(!open)
    }

    const handleChangeSearch = (e) => {
        setInputSearch(e.target.value)

    }

    const handleSearch = (e) => {

        if (e.keyCode === 13) {
            setSearchValue(e.target.value)
        }
    }


    return (
        <div>
            <button
                onClick={handleOpen}
                className='border px-2 sm:px-3 py-2 rounded-md border-gray-300 '>
                <div className='flex items-center text-gray-500'>
                    <AiOutlineSearch className='mr-1 text-sm sm:text-lg' />
                    Search <span className='ml-1 sm:block hidden'>Something...</span>
                </div>
            </button>

            <Dialog
                className='w-full max-w-[77rem] border border-zinc-300  bg-gray-100 xl:px-0 px-2 pt-6 mt-20 shadow-md  '
                open={open}
                size='lg'
                handler={handleOpen}
                dismiss={{
                    enabled: false,
                }}
            >
                <DialogBody className='h-[20rem] overflow-scroll'>
                    <div className='flex justify-between max-w-4xl'>
                        <div className='flex items-center text-gray-500 '>

                            <input
                                onChange={handleChangeSearch}
                                onKeyDown={handleSearch}
                                value={inputSearch}
                                placeholder='search something'
                                className='sm:py-2  px-6 rounded-md w-full  border border-zinc-300'
                            />
                        </div>
                        <button
                            onClick={handleOpen}
                            className='px-3 py-2 border border-gray-400 rounded-md flex items-center'
                        >
                            Close <span className='ml-1'><AiOutlineClose /></span>
                        </button>
                    </div>
                    <div className='pt-4 max-h-[70vh]'>
                        {searchValue ?
                            (<SearchProductSection
                                search={searchValue}
                                onclose={() => setOpen(false)}
                            />
                            )
                            : (
                                <NotFoundText>Start Typing...</NotFoundText>
                            )

                        }
                    </div>
                </DialogBody>
            </Dialog>
        </div>
    )
}

export default SearchSection