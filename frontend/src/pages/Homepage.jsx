import React, { useState } from 'react';
import Notes from '../components/Notes';
import ModalForm from '../components/ModalForm';
import SearchInput from '../components/SearchInput';
import { LuFileText } from "react-icons/lu";

const Homepage = () => {
    const [isEdit, setIsEdit] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("Semua");

    const categories = ["Semua", "Pribadi", "Pekerjaan", "Ide", "Tugas", "Lainnya"];

    return (
        <main className='min-h-screen bg-[#f8fafc] w-full pt-8 pb-16 px-4 md:px-8 font-sans antialiased text-[#0f172a]'>
            <div className='max-w-[1000px] mx-auto'>
                {/* Header Section */}
                <header className='flex items-center justify-between mb-8 pb-6 border-b border-[#e2e8f0]'>
                    <div className='flex items-center space-x-3'>
                        <div className='p-2.5 bg-blue-50 text-blue-600 rounded-xl'>
                            <LuFileText className='text-3xl' />
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold tracking-tight text-[#0f172a]'>MyNotes</h1>
                            <p className='text-sm text-gray-500 font-medium'>Kelola catatan Anda dengan mudah</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsModal(true)}
                        className='bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-xl py-2.5 px-5 font-semibold text-sm shadow-sm transition-all duration-200 flex items-center space-x-2'
                    >
                        <span className='text-lg'>+</span>
                        <span>Buat Catatan</span>
                    </button>
                </header>

                {/* Search & Filter Container Card */}
                <section className='bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm mb-6'>
                    <div className='mb-4'>
                        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    </div>
                    {/* Category Filter Badges */}
                    <div className='flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100'>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                                    categoryFilter === cat
                                        ? 'bg-[#0f172a] text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* List Notes Section */}
                <section>
                    <Notes 
                        searchQuery={searchQuery}
                        categoryFilter={categoryFilter}
                        handleOpenModal={(noteId) => {
                            setIsModal(true);
                            setIsEdit(noteId);
                        }}
                    />
                </section>
            </div>

            {/* Modal Form */}
            {isModal && (
                <ModalForm 
                    isEdit={isEdit}
                    closeModal={() => {
                        setIsModal(false);
                        setIsEdit(null);
                    }}
                />
            )}
        </main>
    );
}

export default Homepage;
