import React from 'react'
import { LuPencil, LuTrash2, LuPin } from "react-icons/lu"

const CATEGORY_MAP = {
    blue: { name: "Pribadi", badgeClass: "bg-blue-50 text-blue-600" },
    green: { name: "Pekerjaan", badgeClass: "bg-emerald-50 text-emerald-600" },
    pink: { name: "Ide", badgeClass: "bg-purple-50 text-purple-600" },
    orange: { name: "Tugas", badgeClass: "bg-orange-50 text-orange-600" },
    stone: { name: "Lainnya", badgeClass: "bg-slate-100 text-slate-600" }
};

const getRelativeTime = (dateString) => {
    try {
        const now = new Date();
        const diffMs = now - new Date(dateString);
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (isNaN(diffMs)) return "beberapa saat lalu";
        if (diffMins < 1) return "baru saja";
        if (diffMins < 60) return `${diffMins} menit yang lalu`;
        if (diffHours < 24) return `sekitar ${diffHours} jam yang lalu`;
        return `${diffDays} hari yang lalu`;
    } catch (e) {
        return "baru saja";
    }
};

const Note = ({id, judul, tanggal, isi, tema, pinned, deleteNote, handleOpenModal, togglePin}) => {
    const category = CATEGORY_MAP[tema] || CATEGORY_MAP.stone;

    return (
        <article className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[220px] relative">
            <section className="flex flex-col flex-1">
                {/* Header Card */}
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-[#0f172a] text-lg tracking-tight line-clamp-1">
                        {judul}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${category.badgeClass} shrink-0`}>
                        {category.name}
                    </span>
                </div>

                {/* Content */}
                <p className="mt-3 text-slate-500 text-sm leading-relaxed whitespace-pre-line line-clamp-5 flex-1">
                    {isi}
                </p>
            </section>

            {/* Footer Card */}
            <footer className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-medium text-slate-400">
                    {getRelativeTime(tanggal)}
                </span>
                
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={togglePin} 
                        title={pinned ? "Unpin Catatan" : "Pin Catatan"}
                        className={`p-1.5 rounded-lg transition duration-200 ${
                            pinned 
                                ? 'bg-amber-50 text-amber-500' 
                                : 'hover:bg-slate-100 hover:text-slate-600'
                        }`}
                    >
                        <LuPin className="text-base" />
                    </button>
                    <button 
                        onClick={handleOpenModal} 
                        title="Edit Catatan"
                        className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-600 transition duration-200"
                    >
                        <LuPencil className="text-base" />
                    </button>
                    <button 
                        onClick={deleteNote} 
                        title="Hapus Catatan"
                        className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition duration-200"
                    >
                        <LuTrash2 className="text-base" />
                    </button>
                </div>
            </footer>
        </article>
    )
}

export default Note