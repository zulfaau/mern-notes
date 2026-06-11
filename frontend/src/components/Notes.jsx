import React, { useState, useEffect } from 'react'
import Note from './Note'

const API_BASE_URL = "http://localhost:5000/api";

const Notes = ({handleOpenModal, searchQuery = "", categoryFilter = "Semua"}) => {
    const [notes, setNotes] = useState([])

    const CATEGORY_TO_TEMA = {
        "Pribadi": "blue",
        "Pekerjaan": "green",
        "Ide": "pink",
        "Tugas": "orange",
        "Lainnya": "stone"
    };

    const getNotes = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/notes`)
            const json = await res.json()
            if (res.ok) {
                setNotes(json.data || [])
            } else {
                alert(json.message || "Gagal mengambil catatan")
            }
        } catch (error) {
            alert("Koneksi gagal: " + error.message)
        }
    }

    const deleteNote = async (noteId) => {
        const confirmDelete = confirm("Apa kamu mau menghapus note ini?")
        if(confirmDelete) {
            try {
                const res = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
                    method: 'DELETE'
                })
                const json = await res.json()
                if (res.ok) {
                    alert(`Note berhasil dihapus`)
                    getNotes()
                } else {
                    alert(json.message || "Gagal menghapus note")
                }
            } catch (error) {
                alert("Koneksi gagal: " + error.message)
            }
        }
    }

    const togglePin = async (noteId) => {
        try {
            const res = await fetch(`${API_BASE_URL}/notes/${noteId}/pin`, {
                method: 'PUT'
            })
            const json = await res.json()
            if (res.ok) {
                getNotes()
            } else {
                alert(json.message || "Gagal mengubah status pin")
            }
        } catch (error) {
            alert("Koneksi gagal: " + error.message)
        }
    }

    useEffect(() => {
        getNotes()
    }, [])

    const filteredNotes = notes.filter(note => {
        const matchesSearch = (note.judul || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                             (note.isi || "").toLowerCase().includes(searchQuery.toLowerCase());
        
        if (categoryFilter === "Semua") {
            return matchesSearch;
        } else {
            const targetTema = CATEGORY_TO_TEMA[categoryFilter];
            return matchesSearch && note.tema === targetTema;
        }
    })

    const sortedNotes = [...filteredNotes].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
    })

    return (
        <div>
            <div className='text-sm font-semibold text-slate-400 mb-4 tracking-tight'>
                {sortedNotes.length} catatan ditemukan
            </div>
            
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                {sortedNotes.length > 0 ? sortedNotes.map(note => (
                    <Note 
                        key={note.id} 
                        {...note} 
                        deleteNote={() => deleteNote(note.id)} 
                        handleOpenModal={() => handleOpenModal(note.id)}
                        togglePin={() => togglePin(note.id)}
                    />
                )) : (
                    <p className="col-span-full text-slate-400 text-sm font-medium py-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                        Belum ada catatan.
                    </p>
                )}
            </section>
        </div>
    )
}

export default Notes