"use client";

export default function NoteCard({ note, onDelete, onEdit }) {
  return (
    // ✨ Key Change: Replaced solid 'bg-white' with 'bg-white/40' and added 'backdrop-blur-md'
    <div 
      className="bg-white/40 backdrop-blur-md p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out border border-white/50 flex flex-col justify-between"
    >
      <div>
        {/* Note Title - Changed text color to dark gray for high contrast */}
        <h2 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">
          {note.title}
        </h2>
        
        {/* Note Content - Changed text color to a slightly lighter dark gray */}
        <p className="text-gray-700 mb-4 text-sm line-clamp-3">
          {note.content}
        </p>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-4 pt-4 border-t border-white/70 flex gap-3">
        
        {/* Edit Button (Soft Yellow/Orange) */}
        <button
          onClick={() => onEdit(note)}
          className="flex-1 bg-yellow-100 text-yellow-800 font-medium px-4 py-2 rounded-lg hover:bg-yellow-200 transition duration-150 ease-in-out text-sm shadow-md"
        >
          Edit 📝
        </button>
        
        {/* Delete Button (Red/Danger) */}
        <button
          onClick={() => onDelete(note._id)}
          className="flex-1 bg-red-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition duration-150 ease-in-out text-sm shadow-md"
        >
          Delete 🗑️
        </button>
      </div>
    </div>
  );
}