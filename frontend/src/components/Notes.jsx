import React, { useState, useEffect } from 'react'
import Note from './Note'

const Notes = ({handleOpenModal}) => {
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

    useEffect(() => {
        getNotes()
    }, [])

    return (
        <section className="mt-10 grid grid-cols-notes gap-x-[20px] gap-y-[40px] w-full">
            {notes.length > 0 ? notes.map(note => (
                <Note key={note.id} {...note} deleteNote={() => deleteNote(note.id)} handleOpenModal={() => handleOpenModal(note.id)}/>
            )) : (
                <p>Belum ada catatan.</p>
            )}
        </section>
    )
}

export default Notes