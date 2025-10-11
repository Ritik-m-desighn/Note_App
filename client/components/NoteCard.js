"use client";

export default function NoteCard({ note, onDelete, onEdit }) {
  return (
    <div className="border rounded p-4 mb-3">
      <h2 className="font-bold">{note.title}</h2>
      <p>{note.content}</p>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => onEdit(note)}
          className="bg-yellow-400 px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
