import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { UserContext } from "./UserContext";

export const noteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const { token } = useContext(UserContext);

  const handleAddNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const { title, content } = newNote;

    let data = {
      title,
      content,
    };

    api
      .post("/add-note", data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("Note added:", res.data);
      })
      .catch((err) => {
        console.error("Failed to add note:", err);
      });
    setNewNote({ title: "", content: "" });
  };

  const handleDeleteNote = (id) => {
    api
      .delete(`/delete-note/${id}`)
      .then((res) => res.data)
      .catch((err) => console.log(err.message));
  };

  const handleChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (token) {
      api
        .get("/get-notes", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => setNotes(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [token, notes]);

  return (
    <noteContext.Provider
      value={{
        notes,
        setNotes,
        newNote,
        setNewNote,
        handleAddNote,
        handleDeleteNote,
        handleChange,
      }}
    >
      {children}
    </noteContext.Provider>
  );
};
