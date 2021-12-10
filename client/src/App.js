import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      await axios.get("http://localhost:5000/notes").then((res) => {
        setNotes(res.data);
      });
    };
    getNotes();
  }, []);

  return (
    <>
      <h1 className="text-center mt-5">Notes App</h1>
      <form className="d-flex mt-5">
        <input type="text" className="form-control" value onChange />
        <button className="btn btn-primary">Add</button>
      </form>

      <div class="row row-cols-1 row-cols-md-3 mt-3">
        {notes.map((note) => {
          return (
            <div class="col mb-4">
              <div class="card">
                <div class="card-body">
                  <p class="card-text">{note.description}</p>
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
