import NotFoundText from '@/components/NotFoundText';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    MenuItem,
} from "@material-tailwind/react";
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

            <Dialog size="xl" open={open} handler={handleOpen}>
                <DialogHeader className="justify-between">
                    <div className='flex items-center text-gray-500 '>

                        <input
                            onChange={handleChangeSearch}
                            onKeyDown={handleSearch}
                            value={inputSearch}
                            placeholder='search something'
                            className='sm:py-2  px-6 rounded-md w-full  border border-zinc-300'
                        />
                    </div>
                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={handleOpen}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </DialogHeader>
                <DialogBody className="overflow-y-scroll !px-5">
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

            {/* <Dialog
                className='w-full max-w-7xl border border-zinc-300  bg-gray-100 xl:px-0 px-2 pt-6 mt-20 shadow-md  '
                open={open}
                size='xl'
                handler={handleOpen}
                dismiss={{
                    enabled: false,
                }}
            >
                <DialogBody className='h-[20rem] overflow-scroll'>
                    <div className='flex justify-between max-w-7xl'>
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
            </Dialog> */}
        </div>
    )
}

export default SearchSection