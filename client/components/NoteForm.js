"use client";
import { useState, useEffect } from "react";

export default function NoteForm({ onSave, editingNote }) {
  const [note, setNote] = useState({ title: "", content: "" });
  const isEditing = !!editingNote && editingNote._id; 

  useEffect(() => {
    if (editingNote && editingNote._id) {
      setNote(editingNote);
    } else {
      setNote({ title: "", content: "" });
    }
  }, [editingNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(note);
    
    if (!isEditing) {
        setNote({ title: "", content: "" });
    }
  };

  // --- REVISED INPUT STYLING ---
  // Making the input background slightly opaque white for a unified glassmorphism look, 
  // but keeping text dark for readability.
  const inputStyleClasses = 
    "w-full p-3 border border-white/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " +
    "transition duration-150 text-lg font-medium bg-white/50 placeholder-gray-700 text-gray-800";


  return (
    // Form Container: Glassmorphism effect
    <div className="p-4 sm:p-6 bg-white/30 backdrop-blur-md shadow-xl rounded-xl mb-8 border border-white/50">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {isEditing ? "Edit Note" : "Create New Note"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Title Input */}
            <input
                type="text"
                name="title"
                placeholder="Note Title "
                value={note.title}
                onChange={handleChange}
                // Apply the new semi-transparent style
                className={inputStyleClasses}
                required
            />
            
            {/* Content Input (changed to textarea for multi-line notes) */}
            <textarea
                name="content"
                placeholder="Write your note content here..."
                value={note.content}
                onChange={handleChange}
                rows="4" 
                // Apply the new semi-transparent style
                className={`${inputStyleClasses} resize-y`}
                required
            />
            
            {/* Submission Button */}
            <button 
                type="submit" 
                className={`w-full py-3 rounded-lg font-semibold text-white transition duration-200 ease-in-out ${
                    isEditing 
                        ? "bg-green-600 hover:bg-green-700 shadow-md shadow-green-200" 
                        : "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200"
                }`}
            >
                {isEditing ? "Save Changes" : "Add Note"}
            </button>
        </form>
    </div>
  );
}