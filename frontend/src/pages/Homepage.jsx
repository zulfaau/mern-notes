import React, { useState } from 'react';
import Notes from '../components/Notes';
import ModalForm from '../components/ModalForm';
import SearchInput from '../components/SearchInput';
import backgroundImage from '../pages/background.jpg'; // Gantilah dengan path yang benar

const Homepage = () => {
    const [isEdit, setIsEdit] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <main className='max-w-[1200px] mx-auto pt-5' 
            style={{ backgroundImage: "url('https://i.pinimg.com/736x/24/30/a2/2430a2caaeb14ae9bd35ffb46cfc5b7a.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* Search Section */}
            <div className='mb-10'>
                <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            <div className='mt-14'>
                {/* Header Section */}
                <div className='flex flex-col md:flex-row items-center justify-between p-10 rounded-lg shadow-lg mb-10'
                  style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'bottom'}}
  
                >
                    <div className='flex flex-col'>
                        <h1 className='text-5xl text-gray-800 font-semibold mb-3'>MyNotes</h1>
                        <p className='text-xl text-gray-600'>Simpan catatan penting kamu dengan mudah!</p>
                    </div>
                    
                </div>

                {/* Add Note Button */}
                <div className='flex justify-between mb-10'>
                    <button 
                        className='bg-blue-500 border border-blue-500 text-white rounded-full py-4 px-6 hover:bg-blue-700 hover:border-blue-700 transition duration-300 text-lg flex items-center space-x-2'
                        onClick={() => setIsModal(true)}
                    >
                        <span>Tambah catatan</span>
                    </button>
                </div>

                {/* MyNotes Section */}
                <div className='bg-white bg-opacity-90 p-10 rounded-lg shadow-lg mb-10'>
                    <h2 className='text-3xl font-semibold mb-5'>Daftar Catatan</h2>
                    <div className='flex flex-wrap gap-8 w-full'>
                        <Notes 
                            searchQuery={searchQuery}
                            handleOpenModal={(noteId) => {
                                setIsModal(true);
                                setIsEdit(noteId);
                            }}
                        />
                    </div>
                </div>
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
