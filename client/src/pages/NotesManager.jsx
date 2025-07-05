import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";

const NotesManager = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const handleAddNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;
    setNotes([...notes, newNote]);
    setNewNote({ title: "", content: "" });
  };

  const handleEditNote = (index) => {
    setNewNote(notes[index]);
    setEditingIndex(index);
  };

  const handleUpdateNote = () => {
    const updatedNotes = [...notes];
    updatedNotes[editingIndex] = newNote;
    setNotes(updatedNotes);
    setNewNote({ title: "", content: "" });
    setEditingIndex(null);
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div
      className={`relative ${
        theme === "dark"
          ? "bg-[var(--darkThemeBg)] text-[var(--darkThemeText)]"
          : "bg-[var(--lightThemeBg)] text-[var(--lightThemeText)]"
      }`}
    >
      <Navbar />
      <div className="w-full flex justify-between min-h-screen p-6 shadow-md rounded-xl">
        {/* New/Edit Note Form */}
        <div className="space-y-3 mb-6">
          <h1 className="text-2xl font-bold mb-4">
            Welcome,{" "}
            <span className="font-normal">
              {user ? user[0].toUpperCase() + user.slice(1).toLowerCase() : ""}
            </span>{" "}
            👋
          </h1>
          <input
            type="text"
            name="title"
            placeholder="Note title"
            value={newNote.title}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md
                ${
                  theme === "dark"
                    ? "bg-[var(--darkThemeBg)] text-[var(--darkThemeText)]"
                    : "bg-[var(--lightThemeBg)] text-[var(--lightThemeText)]"
                }
                `}
          />
          <textarea
            name="content"
            placeholder="Note content"
            value={newNote.content}
            onChange={handleChange}
            rows="3"
            className={`w-full p-2 border rounded-md
                ${
                  theme === "dark"
                    ? "bg-[var(--darkThemeBg)] text-[var(--darkThemeText)]"
                    : "bg-[var(--lightThemeBg)] text-[var(--lightThemeText)]"
                }`}
          ></textarea>

          {editingIndex !== null ? (
            <button
              onClick={handleUpdateNote}
              className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
            >
              Update Note
            </button>
          ) : (
            <button
              onClick={handleAddNote}
              className="bg-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Note
            </button>
          )}

          {notes.length === 0 && (
            <p className="text-gray-500">
              No notes yet. Start writing something!
            </p>
          )}
        </div>

        {/* Notes List */}
        {notes.length > 0 && (
          <div className="min-w-1/2">
            {notes.map((note, index) => (
              <div key={index} className="border p-4 rounded-md shadow-sm">
                <h2 className="text-xl font-semibold">{note.title}</h2>
                <p className="mt-1">{note.content}</p>
                <div className="mt-3 space-x-3">
                  <button
                    onClick={() => handleEditNote(index)}
                    className="text-yellow-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(index)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesManager;
