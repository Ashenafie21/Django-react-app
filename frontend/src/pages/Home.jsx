import React, { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css"

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const res = await api.get("/api/notes/");
            setNotes(res.data);
            console.log(res.data);
        } catch (err) {
            alert(err);
        }
    };

    const deleteNote = async (id) => {
        try {
            const res = await api.delete(`/api/notes/delete/${id}/`);
            if (res.status === 204) alert("Note deleted!");
            else alert("Failed to delete note");
            getNotes();
        } catch (error) {
            alert(error);
        }
    };

    const createNote = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/notes/", { content, title });
            if (res.status === 201) alert("Note created!");
            else alert("Failed to make note.");
            getNotes();
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title</label>
                <br />
                <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <br />
                <label htmlFor="content">Content</label>
                <br />
                <textarea
                    name="content"
                    id="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Home;
