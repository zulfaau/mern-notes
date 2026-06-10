import React from 'react'
import { IoSearch } from "react-icons/io5";

const SearchInput = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className='flex items-center border-2 border-gray-200 rounded-full py-2 px-4 bg-white bg-opacity-95 shadow-sm'>
            <IoSearch className='mr-5 text-xl text-gray-500'/>
            <input 
                type="text" 
                placeholder='Cari catatan...' 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='border-none outline-none flex-1 text-lg text-gray-600 bg-transparent'
            />
        </div>
    )
}

export default SearchInput