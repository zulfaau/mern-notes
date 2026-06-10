import React, { useState } from 'react';
import Notes from '../components/Notes';
import ModalForm from '../components/ModalForm';
import SearchInput from '../components/SearchInput';
import backgroundImage from '../pages/background.jpg'; // Gantilah dengan path yang benar

const BACKGROUNDS = {
    default: {
        name: "Pink Grid 🎀",
        style: { 
            backgroundColor: "#fff1f2",
            backgroundImage: "linear-gradient(rgba(244, 63, 94, 0.15) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(244, 63, 94, 0.15) 1.5px, transparent 1.5px)",
            backgroundSize: "30px 30px",
            backgroundAttachment: 'fixed', 
            minHeight: '100vh' 
        }
    },
    kuromi: {
        name: "Kuromi 😈",
        style: { 
            backgroundColor: "#faf5ff",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 15c-2-3-7-3-9 0-2 3-2 7 0 10l9 9 9-9c2-3 2-7 0-10-2-3-7-3-9 0z' fill='%23c084fc' fill-opacity='0.3'/%3E%3Ccircle cx='10' cy='45' r='3' fill='%23c084fc' fill-opacity='0.2'/%3E%3Ccircle cx='50' cy='45' r='3' fill='%23c084fc' fill-opacity='0.2'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            backgroundAttachment: 'fixed', 
            minHeight: '100vh' 
        }
    },
    spiderman: {
        name: "Spider-Man 🕷️",
        style: { 
            backgroundColor: "#fef2f2",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 0 L40 80 M0 40 L80 40 M0 0 L80 80 M0 80 L80 0 M40 10 A30 30 0 0 0 10 40 M10 40 A30 30 0 0 0 40 70 M40 70 A30 30 0 0 0 70 40 M70 40 A30 30 0 0 0 40 10' fill='none' stroke='%23fca5a5' stroke-width='1.5' stroke-opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
            backgroundAttachment: 'fixed', 
            minHeight: '100vh' 
        }
    },
    cinnamoroll: {
        name: "Cinnamoroll ☁️",
        style: { 
            backgroundColor: "#f0f9ff",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M20 45 a10 10 0 0 1 20 0 a8 8 0 0 1 15 0 a10 10 0 0 1 10 10 L10 55 z' fill='%23bae6fd' fill-opacity='0.5'/%3E%3Cpath d='M60 20 L62 25 L67 25 L63 28 L65 33 L60 30 L55 33 L57 28 L53 25 L58 25 z' fill='%23fed7aa' fill-opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
            backgroundAttachment: 'fixed', 
            minHeight: '100vh' 
        }
    },
    doraemon: {
        name: "Doraemon 🐱",
        style: { 
            backgroundColor: "#e0f2fe",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='15' cy='15' r='5' fill='%2360a5fa' fill-opacity='0.3'/%3E%3Ccircle cx='45' cy='45' r='5' fill='%23facc15' fill-opacity='0.4'/%3E%3Ccircle cx='45' cy='15' r='2' fill='%2393c5fd' fill-opacity='0.3'/%3E%3Ccircle cx='15' cy='45' r='2' fill='%2393c5fd' fill-opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            backgroundAttachment: 'fixed', 
            minHeight: '100vh' 
        }
    }
};

const Homepage = () => {
    const [isEdit, setIsEdit] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [background, setBackground] = useState(localStorage.getItem("note_bg") || "default");

    const exportNotes = () => {
        try {
            const saved = localStorage.getItem("notes") || "[]"
            const blob = new Blob([saved], { type: "application/json" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `MyNotes_Backup_${new Date().toISOString().split('T')[0]}.json`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        } catch (error) {
            alert("Gagal mengekspor catatan: " + error.message)
        }
    }

    const importNotes = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (event) => {
            try {
                const importedData = JSON.parse(event.target.result)
                if (Array.isArray(importedData)) {
                    const overwrite = confirm("Apakah Anda ingin mengganti semua catatan yang ada dengan catatan dari backup? (Pilih Cancel untuk menggabungkannya)")
                    let finalNotes = []
                    const saved = localStorage.getItem("notes")
                    const currentNotes = saved ? JSON.parse(saved) : []

                    if (overwrite) {
                         finalNotes = importedData
                    } else {
                         const currentIds = new Set(currentNotes.map(n => n.id))
                         finalNotes = [...currentNotes, ...importedData.filter(n => !currentIds.has(n.id))]
                    }
                    localStorage.setItem("notes", JSON.stringify(finalNotes))
                    alert("Catatan berhasil diimpor!")
                    window.location.reload()
                } else {
                    alert("Format file backup tidak valid.")
                }
            } catch (error) {
                alert("Gagal membaca file backup: " + error.message)
            }
        }
        reader.readAsText(file)
    }

    const currentBgStyle = BACKGROUNDS[background]?.style || BACKGROUNDS.default.style;

    return (
        <main className='w-full pt-5 px-4 md:px-8 transition-all duration-300' style={currentBgStyle}>
            <div className='max-w-[1200px] mx-auto'>
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

                    {/* Add Note & Controls Button */}
                    <div className='flex flex-wrap items-center justify-between gap-4 mb-10 bg-white bg-opacity-95 p-6 rounded-2xl shadow-md'>
                        <button 
                            className='bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-6 font-semibold shadow-sm transition duration-300 text-lg flex items-center space-x-2'
                            onClick={() => setIsModal(true)}
                        >
                            <span>Tambah catatan</span>
                        </button>

                        {/* Background Switcher */}
                        <div className='flex flex-wrap items-center gap-2 bg-gray-100 p-2 rounded-2xl md:rounded-full'>
                            <span className='text-sm text-gray-500 font-medium ml-2'>Tema:</span>
                            {Object.keys(BACKGROUNDS).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setBackground(key);
                                        localStorage.setItem("note_bg", key);
                                    }}
                                    className={`px-3.5 py-1 rounded-full text-xs font-semibold transition duration-200 ${background === key ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-200'}`}
                                >
                                    {BACKGROUNDS[key].name}
                                </button>
                            ))}
                        </div>

                        {/* Backup & Restore */}
                        <div className='flex items-center space-x-3'>
                            <button
                                onClick={exportNotes}
                                className='bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-2 px-5 rounded-full transition duration-300 shadow-sm'
                            >
                                Backup (.json)
                            </button>
                            <label className='bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold py-2 px-5 rounded-full cursor-pointer transition duration-300 shadow-sm'>
                                Restore
                                <input 
                                    type="file" 
                                    accept=".json" 
                                    onChange={importNotes} 
                                    className="hidden" 
                                />
                            </label>
                        </div>
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
