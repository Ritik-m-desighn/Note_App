"use client";
import { useState, useEffect } from "react";

export default function NoteForm({ onSave, editingNote }) {
  const [note, setNote] = useState({ title: "", content: "" });

  useEffect(() => {
    if (editingNote) setNote(editingNote);
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(note);
    setNote({ title: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Title"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        className="border p-2 mr-2"
        required
      />
      <input
        type="text"
        placeholder="Content"
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        className="border p-2 mr-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {editingNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}
