import React from 'react'
import { IoSearch } from "react-icons/io5";

const SearchInput = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className='flex items-center border border-slate-200 rounded-xl py-2 px-4 bg-[#f8fafc] focus-within:bg-white focus-within:border-slate-300 focus-within:shadow-sm transition-all duration-200'>
            <IoSearch className='mr-3 text-lg text-slate-400'/>
            <input 
                type="text" 
                placeholder='Cari catatan...' 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='border-none outline-none flex-1 text-sm text-[#0f172a] bg-transparent placeholder-slate-400'
            />
        </div>
    )
}

export default SearchInput