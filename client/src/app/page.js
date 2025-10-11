"use client";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import NoteCard from "../../components/NoteCard";
import NoteForm from "../../components/NoteForm";

export default function Page() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login"; // redirect if not logged in
      return;
    }

    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
      } catch {
        window.location.href = "/login";
      }
    };
    fetchNotes();
  }, []);

  const handleSave = async (note) => {
    if (note._id) {
      const res = await api.put(`/notes/${note._id}`, note);
      setNotes(notes.map((n) => (n._id === note._id ? res.data : n)));
    } else {
      const res = await api.post("/notes", note);
      setNotes([...notes, res.data]);
    }
    setEditingNote(null);
  };

  const handleDelete = async (id) => {
    await api.delete(`/notes/${id}`);
    setNotes(notes.filter((n) => n._id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <NoteForm onSave={handleSave} editingNote={editingNote} />

      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onDelete={handleDelete}
          onEdit={() => setEditingNote(note)}
        />
      ))}
    </main>
  );
}
