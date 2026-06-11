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

    const API_BASE_URL = "http://localhost:5000/api";

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(!isEdit) {
                const res = await fetch(`${API_BASE_URL}/notes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        judul: values.judul,
                        tanggal: values.tanggal,
                        isi: values.isi,
                        tema: values.tema
                    })
                })
                const json = await res.json()
                if (res.ok) {
                    closeModal()
                    window.location.reload()
                } else {
                    alert(json.message || "Gagal menambahkan catatan")
                }
            } else {
                const res = await fetch(`${API_BASE_URL}/notes/${isEdit}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        judul: values.judul,
                        tanggal: values.tanggal,
                        isi: values.isi,
                        tema: values.tema
                    })
                })
                const json = await res.json()
                if (res.ok) {
                    closeModal()
                    window.location.reload()
                } else {
                    alert(json.message || "Gagal mengedit catatan")
                }
            }
        } catch (error) {
            alert("Koneksi gagal: " + error.message)
        }
    }

    const getNote = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/notes/${isEdit}`)
            const json = await res.json()
            if (res.ok && json.data) {
                const found = json.data
                setValues({
                    judul: found.judul,
                    tanggal: new Date(found.tanggal).toLocaleDateString('en-CA'),
                    isi: found.isi,
                    tema: found.tema
                })
            } else {
                alert(json.message || "Gagal mengambil detail catatan")
            }
        } catch (error) {
            alert("Koneksi gagal: " + error.message)
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
    
    const CATEGORIES = [
        { id: "blue", label: "Pribadi", color: "bg-blue-500" },
        { id: "green", label: "Pekerjaan", color: "bg-emerald-500" },
        { id: "pink", label: "Ide", color: "bg-purple-500" },
        { id: "orange", label: "Tugas", color: "bg-orange-500" },
        { id: "stone", label: "Lainnya", color: "bg-slate-500" }
    ];

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm'>
            <div className='w-full max-w-lg bg-white rounded-2xl border border-slate-100 shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200'>
                <h2 className='text-xl font-bold text-[#0f172a] text-center mb-6'>{isEdit ? "Edit" : "Tambah"} Catatan</h2>
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div className='flex flex-col space-y-1.5'>
                        <label className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Judul catatan</label>
                        <input 
                            type="text" 
                            id='judul'
                            required
                            value={values.judul}
                            onChange={handleChange}
                            placeholder='Tulis judul catatan disini...' 
                            className='w-full border border-slate-200 rounded-xl py-2 px-3 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all'
                        />
                    </div>
                    <div className='flex flex-col space-y-1.5'>
                        <label className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Tanggal catatan</label>
                        <input 
                            type="date" 
                            id='tanggal'
                            required
                            value={values.tanggal}
                            onChange={handleChange}
                            className='w-full border border-slate-200 rounded-xl py-2 px-3 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all'
                        />
                    </div>
                    <div className='flex flex-col space-y-1.5'>
                        <label className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Isi catatan</label>
                        <textarea 
                            rows={4} 
                            id='isi'
                            required
                            value={values.isi}
                            onChange={handleChange}
                            placeholder='Tulis isi catatan disini...'
                            className='w-full border border-slate-200 rounded-xl py-2.5 px-3 text-sm focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none transition-all resize-none'
                        />
                    </div>
                    
                    <div className='flex flex-col space-y-2'>
                        <label className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Kategori</label>
                        <div className='flex flex-wrap gap-2'>
                            {CATEGORIES.map(cat => (
                                <button
                                    type="button"
                                    key={cat.id}
                                    onClick={() => setValues({ ...values, tema: cat.id })}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-200 flex items-center space-x-1.5 ${
                                        values.tema === cat.id
                                            ? 'bg-[#0f172a] text-white border-[#0f172a]'
                                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                    }`}
                                >
                                    <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                                    <span>{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='flex items-center justify-end space-x-2 pt-4 border-t border-slate-100 mt-6'>
                        <button 
                            type='button' 
                            className='px-5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-50 transition duration-200' 
                            onClick={handleClose}
                        >
                            Batal
                        </button>
                        <button 
                            type='submit' 
                            className='px-5 py-2 rounded-xl bg-[#0f172a] text-white text-xs font-bold hover:bg-slate-800 transition duration-200'
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalForm