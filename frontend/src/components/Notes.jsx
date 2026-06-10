import React, { useState, useEffect } from 'react'
import Note from './Note'

const Notes = ({handleOpenModal, searchQuery = ""}) => {
    const [notes, setNotes] = useState([])

    const getNotes = () => {
        try {
            const saved = localStorage.getItem("notes")
            if(saved) {
                setNotes(JSON.parse(saved))
            } else {
                setNotes([])
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const deleteNote = (noteId) => {
        const confirmDelete = confirm("Apa kamu mau menghapus note ini?")
        if(confirmDelete) {
            try {
                const saved = localStorage.getItem("notes")
                const list = saved ? JSON.parse(saved) : []
                const filtered = list.filter(note => note.id !== noteId)
                localStorage.setItem("notes", JSON.stringify(filtered))
                alert(`Note dengan id = ${noteId} sudah dihapus`)
                setNotes(filtered)
            } catch (error) {
                alert(error.message)
            }
        }
    }

    const togglePin = (noteId) => {
        try {
            const saved = localStorage.getItem("notes")
            const list = saved ? JSON.parse(saved) : []
            const updated = list.map(note => {
                if (note.id === noteId) {
                    return { ...note, pinned: !note.pinned }
                }
                return note
            })
            localStorage.setItem("notes", JSON.stringify(updated))
            setNotes(updated)
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        getNotes()
    }, [])

    const filteredNotes = notes.filter(note => 
        (note.judul || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
        (note.isi || "").toLowerCase().includes(searchQuery.toLowerCase())
    )

    const sortedNotes = [...filteredNotes].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
    })

    return (
        <section className="mt-10 grid grid-cols-notes gap-x-[20px] gap-y-[40px] w-full">
            {sortedNotes.length > 0 ? sortedNotes.map(note => (
                <Note 
                    key={note.id} 
                    {...note} 
                    deleteNote={() => deleteNote(note.id)} 
                    handleOpenModal={() => handleOpenModal(note.id)}
                    togglePin={() => togglePin(note.id)}
                />
            )) : (
                <p>Belum ada catatan.</p>
            )}
        </section>
    )
}

export default Notes