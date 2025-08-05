import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";
import { noteContext } from "../context/NoteContext";

const NotesManager = () => {
  let {
    notes,
    setNotes,
    newNote,
    setNewNote,
    handleAddNote,
    handleChange,
    handleDeleteNote,
    handleEditNote,
    isEdited,
  } = useContext(noteContext);

  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

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

          <button
            onClick={handleAddNote}
            className="bg-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {isEdited ? "Update" : "Add"}
          </button>

          {notes.length === 0 && (
            <p className="text-gray-500">
              No notes yet. Start writing something!
            </p>
          )}
        </div>

        {/* Notes List */}
        {notes.length > 0 ? (
          <div className="min-w-1/2">
            {notes.map((note, index) => (
              <div key={index} className="border mb-2 p-4 rounded-md shadow-sm">
                <h2 className="text-xl font-semibold">{note.title}</h2>
                <p className="mt-1">{note.content}</p>
                <div className="mt-3 space-x-3">
                  <button
                    onClick={() => handleEditNote(note, index)}
                    className="text-yellow-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`flex justify-center items-center min-w-1/2
            ${
              theme === "dark"
                ? "bg-[var(--darkThemeBg)] text-[var(--darkThemeText)]"
                : "bg-[var(--lightThemeBg)] text-[var(--lightThemeText)]"
            }
          `}
          >
            <span className="text-2xl">Nothing Special 🎈</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesManager;
