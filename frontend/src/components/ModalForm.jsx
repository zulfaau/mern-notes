import React, { useState, useEffect } from 'react'

const ModalForm = ({isEdit, closeModal}) => {

    const [values, setValues] = useState({
        judul: "",
        tanggal: new Date().toLocaleDateString('en-CA'),
        isi: "",
        tema: "orange"
    })

    const handleChange = (e) => {
        const value = e.target.value 
        setValues({
            ...values,
            [e.target.id]: value
        })
    }

    const handleChangeTheme = (e) => {
        const value = e.target.value
        setValues({
            ...values,
            tema: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const saved = localStorage.getItem("notes")
            const list = saved ? JSON.parse(saved) : []

            if(!isEdit) {
                const newNote = {
                    id: Date.now(),
                    judul: values.judul,
                    tanggal: values.tanggal,
                    isi: values.isi,
                    tema: values.tema,
                    createdAt: new Date().toISOString()
                }
                list.push(newNote)
                localStorage.setItem("notes", JSON.stringify(list))
                closeModal()
                window.location.reload()
            } else {
                const updatedList = list.map(note => {
                    if (note.id === Number(isEdit) || note.id === isEdit) {
                        return {
                            ...note,
                            judul: values.judul,
                            tanggal: values.tanggal,
                            isi: values.isi,
                            tema: values.tema
                        }
                    }
                    return note
                })
                localStorage.setItem("notes", JSON.stringify(updatedList))
                closeModal()
                window.location.reload()
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const getNote = () => {
        try {
            const saved = localStorage.getItem("notes")
            const list = saved ? JSON.parse(saved) : []
            const found = list.find(note => note.id === Number(isEdit) || note.id === isEdit)
            if(found) {
                setValues({
                    judul: found.judul,
                    tanggal: new Date(found.tanggal).toLocaleDateString('en-CA'),
                    isi: found.isi,
                    tema: found.tema
                })
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const handleClose = () => {
        setValues({
            judul: "",
            tanggal: new Date().toLocaleDateString('en-CA'),
            isi: "",
            tema: "orange"
        })
        closeModal()
    }

    useEffect(() => {
        if(isEdit) {
            getNote()
        }
    }, [isEdit])
    
    return (
        <div className='fixed w-full h-full bg-[rgba(0,0,0,0.6)] top-0 right-0 left-0 bottom-0'>
            <div className='w-full h-full flex items-center justify-center'>
                <div className='w-[600px] min-h-[200px] p-10 bg-white rounded-2xl'>
                    <h2 className='text-center text-3xl font-medium'>{isEdit ? "Edit" : "Tambah"} catatan</h2>
                    <form onSubmit={handleSubmit} className='mt-7'>
                        <div className='flex flex-col space-y-2 mb-4'>
                            <label className='text-lg text-gray-700'>Judul catatan</label>
                            <input 
                                type="text" 
                                id='judul'
                                required
                                value={values.judul}
                                onChange={handleChange}
                                placeholder='Tulis judul catatan disini...' 
                                className='border border-gray-200 rounded-2xl py-2 px-4'/>
                        </div>
                        <div className='flex flex-col space-y-2 mb-4'>
                            <label className='text-lg text-gray-700'>Tanggal catatan</label>
                            <input 
                                type="date" 
                                id='tanggal'
                                required
                                value={values.tanggal}
                                onChange={handleChange}
                                className='border border-gray-200 rounded-2xl py-2 px-4'/>
                        </div>
                        <div className='flex flex-col space-y-2 mb-4'>
                            <label className='text-lg text-gray-700'>Isi catatan</label>
                            <textarea 
                                rows={4} 
                                cols={4} 
                                id='isi'
                                required
                                value={values.isi}
                                onChange={handleChange}
                                placeholder='Tulis isi catatan disini...'
                                className='border border-gray-200 rounded-2xl py-2 px-4'/>
                        </div>
                        <div className="flex items-center space-x-5 mt-5 mb-6">
                            <div>
                                <label htmlFor="orange" className={`w-6 h-6 rounded-full bg-orange-400 inline-block cursor-pointer transition duration-200 ease-in ${values.tema === "orange" ? "transform scale-125 transition duration-200" : ""}`}/>
                                <input 
                                    type="radio" 
                                    id="orange"
                                    value="orange" 
                                    className="hidden" 
                                    onChange={handleChangeTheme}/>
                            </div>
                            <div>
                                <label htmlFor="green" className={`w-6 h-6 rounded-full bg-green-400 inline-block cursor-pointer transition duration-200 ease-in ${values.tema === "green" ? "transform scale-125 transition duration-200" : ""}`}/>
                                <input 
                                    type="radio" 
                                    id="green"
                                    value="green" 
                                    className="hidden" 
                                    onChange={handleChangeTheme}/>
                            </div>
                            <div>
                                <label htmlFor="blue" className={`w-6 h-6 rounded-full bg-blue-400 inline-block cursor-pointer transition duration-200 ease-in ${values.tema === "blue" ? "transform scale-125 transition duration-200" : ""}`}/>
                                <input 
                                    type="radio" 
                                    id="blue"
                                    value="blue" 
                                    className="hidden" 
                                    onChange={handleChangeTheme}/>
                            </div>
                            <div>
                                <label htmlFor="pink" className={`w-6 h-6 rounded-full bg-pink-400 inline-block cursor-pointer transition duration-200 ease-in ${values.tema === "pink" ? "transform scale-125 transition duration-200" : ""}`}/>
                                <input 
                                    type="radio" 
                                    id="pink"
                                    value="pink" 
                                    className="hidden" 
                                    onChange={handleChangeTheme}/>
                            </div>
                            <div>
                                <label htmlFor="stone" className={`w-6 h-6 rounded-full bg-stone-400 inline-block cursor-pointer transition duration-200 ease-in ${values.tema === "stone" ? "transform scale-125 transition duration-200" : ""}`}/>
                                <input 
                                    type="radio" 
                                    id="stone"
                                    value="stone" 
                                    className="hidden" 
                                    onChange={handleChangeTheme}/>
                            </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <button type='button' className='border-none outline-none bg-gray-300 text-black py-2 px-6 rounded-2xl text-lg hover:opacity-85' onClick={handleClose}>
                                Cancel
                            </button>
                            <button type='submit' className='border-none outline-none bg-gray-700 text-white py-2 px-6 rounded-2xl text-lg hover:opacity-85'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalForm