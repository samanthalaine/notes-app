import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      await axios.get("http://localhost:5000/notes").then((res) => {
        setNotes(res.data);
      });
    };
    getNotes();
  }, []);

  const addNote = async (e) => {
    const newNote = { description };
    e.preventDefault();
    await axios.post("http://localhost:5000/notes", newNote).then(() => {
      setNotes([...notes, newNote]);
    });
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`).then(() => {
      setNotes(notes.filter((note) => note.note_id !== id));
    });
  };

  return (
    <>
      <h1 className="text-center mt-5">Notes App</h1>
      <form onSubmit={addNote} className="d-flex mt-5">
        <input
          type="text"
          className="form-control"
          placeholder="Add a note..."
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-primary">Add</button>
      </form>

      <div class="row row-cols-1 row-cols-md-3 mt-3">
        {notes.map((note) => {
          return (
            <div class="col mb-4">
              <div class="card">
                <div class="card-body">
                  <p class="card-text">{note.description}</p>
                  <button
                    onClick={() => deleteNote(note.note_id)}
                    class="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
