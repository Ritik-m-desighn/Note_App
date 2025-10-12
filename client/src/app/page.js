"use client";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import NoteCard from "../../components/NoteCard";
import NoteForm from "../../components/NoteForm";
import { Toaster, toast } from "react-hot-toast";

// --- REVISED NotesDashboard COMPONENT ---

export default function NotesDashboard() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Utility Functions (kept identical for brevity)
  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found.");
      }
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (error) {
      toast.error("Session expired or unauthorized. Please log in again.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSave = async (note) => {
    try {
      if (note._id) {
        const res = await api.put(`/notes/${note._id}`, note);
        setNotes(notes.map((n) => (n._id === note._id ? res.data : n)));
        toast.success("Note updated successfully!");
      } else {
        const res = await api.post("/notes", note);
        setNotes([res.data, ...notes]);
        toast.success("New note added!");
      }
      setEditingNote(null);
    } catch (err) {
      toast.error("Failed to save note. Please check your network.");
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this note?");
    if (!isConfirmed) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
      toast.success("Note deleted.");
    } catch (err) {
      toast.error("Failed to delete note.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast('Logging out...', { icon: '👋' });
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  };

  // Loading state (kept identical for brevity)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600">Loading your notes...</p>
        </div>
      </div>
    );
  }

  return (
    // 1. Main container with full-screen background image
    <main
      className="min-h-screen p-6 sm:p-10 bg-cover bg-center bg-fixed relative"
      style={{
        // Using a light, inspiring background for better contrast with note cards
        backgroundImage: "url('https://images.hdqwalls.com/download/cherry-tree-anime-5d-2880x1800.jpg')",
      }}
    >
      <Toaster position="top-right" reverseOrder={false} />

      {/* Optional: Semi-transparent overlay for background control */}
      {/* <div className="absolute inset-0 bg-black opacity-10"></div> */}

      {/* Content Wrapper: This ensures all content is stacked above the background */}
      <div className="relative z-10 max-w-7xl mx-auto"> 
        
        {/* Header with Title and Logout Button */}
        <header className="flex justify-between items-center mb-8 pb-4 bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white">
          <h1 className="text-3xl font-extrabold text-gray-800">My Notes App</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-200 flex items-center gap-2"
          >
            Logout 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </button>
        </header>

        {/* Note Form: ALREADY HAS bg-white in its own file */}
        <NoteForm onSave={handleSave} editingNote={editingNote} />

        {/* Notes List Section */}
        <section className="mt-8">
            <h2 className="text-xl font-semibold text-white bg-gray-800/80 backdrop-blur-sm inline-block p-2 rounded-lg mb-4 shadow-lg">
                {notes.length} {notes.length === 1 ? 'Note' : 'Notes'} Found
            </h2>

            {notes.length === 0 ? (
                <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-xl bg-white/80 backdrop-blur-none mt-8 shadow-inner">
                    <p className="text-gray-600 text-lg">You don't have any notes yet. Start writing one above! 🚀</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* NoteCard component ALREADY HAS bg-white in its own file */}
                    {notes.map((note) => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            onDelete={handleDelete}
                            onEdit={() => setEditingNote(note)}
                        />
                    ))}
                </div>
            )}
        </section>
      </div>
    </main>
  );
}