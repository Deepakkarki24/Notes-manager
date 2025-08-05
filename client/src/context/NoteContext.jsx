import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { UserContext } from "./UserContext";

export const noteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [isEdited, setIsEdited] = useState({ status: false, id: "" });
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const { token } = useContext(UserContext);
  console.log(isEdited);
  const handleAddNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    if (isEdited.status) {
      const { title, content } = newNote;

      let data = {
        title,
        content,
      };
      api
        .patch(`/update-note/${isEdited.id}`, data)
        .then((res) => fetchNotes())
        .catch((err) => console.log(err));
      setIsEdited({ status: false, id: "" });
    } else {
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
          fetchNotes();
          console.log("Note added:", res.data);
        })
        .catch((err) => {
          console.error("Failed to add note:", err);
        });
    }

    setNewNote({ title: "", content: "" });
  };

  const handleDeleteNote = (id) => {
    api
      .delete(`/delete-note/${id}`)
      .then((res) => {
        fetchNotes();
        res.data;
      })
      .catch((err) => console.log(err.message));
  };

  const handleChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const handleEditNote = (note) => {
    setIsEdited({ status: true, id: note._id });
    setNewNote({
      title: note.title,
      content: note.content,
    });
  };

  const fetchNotes = () => {
    api
      .get("/get-notes", {
        headers: { Authorization: token },
      })
      .then((res) => setNotes(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (token) fetchNotes();
  }, [token]);
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
        handleEditNote,
        isEdited,
      }}
    >
      {children}
    </noteContext.Provider>
  );
};
