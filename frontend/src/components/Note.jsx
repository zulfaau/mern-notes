import React from 'react'
import { MdEdit, MdDelete, MdPushPin } from "react-icons/md"


const Note = ({id, judul, tanggal, isi, tema, pinned, deleteNote, handleOpenModal, togglePin}) => {
    return (
        <article className={`flex justify-between rounded-[20px] p-6 min-h-[250px] bg-${tema}-400 relative shadow-md`}>
            <section className='flex flex-col self-start pr-8'>
                <h1 className="text-[#1e201e] font-medium tracking-tight text-2xl self-start">
                    {judul}
                </h1>
                <p className='mt-2 text-[#1e201e] text-sm opacity-80'>{new Date(tanggal).toLocaleDateString()}</p>
                <p className='mt-2 text-[#1e201e] whitespace-pre-line'>{isi}</p>
            </section>
            <section className="flex self-end justify-end w-max">
                <div className="flex flex-col space-y-3">
                    <div className={`group rounded-full p-2.5 flex items-center justify-center cursor-pointer transition duration-200 ease-in ${pinned ? 'bg-white shadow-sm' : 'bg-[#1e201e] hover:bg-white'}`} onClick={togglePin}>
                        <MdPushPin className={`text-2xl transition duration-200 ease-in ${pinned ? 'text-[#1e201e] transform rotate-45' : 'text-white group-hover:text-[#1e201e]'}`}/>
                    </div>
                    <div className="group bg-[#1e201e] rounded-full p-2.5 flex items-center justify-center cursor-pointer hover:bg-white transition duration-200 ease-in" onClick={handleOpenModal}>
                        <MdEdit className="text-2xl text-white group-hover:text-[#1e201e] transition duration-200 ease-in"/>
                    </div>
                    <div className="group bg-[#1e201e] rounded-full p-2.5 flex items-center justify-center cursor-pointer hover:bg-white transition duration-200 ease-in" onClick={deleteNote}>
                        <MdDelete className="text-2xl text-white group-hover:text-[#1e201e] transition duration-200 ease-in"/>
                    </div>
                </div>
            </section>
        </article>
    )
}

export default Note