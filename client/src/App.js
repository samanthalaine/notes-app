import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const getNotes = async () => {
      await axios.get('http://localhost:5000/notes').then((res) => {
        setNotes(res.data);
      })
    }
    getNotes()
  },[])


  return (
    <>
     <h1 className="text-center mt-5">Notes App</h1>
      <form className="d-flex mt-5" >
        <input
          type="text"
          className="form-control"
          value
          onChange
        />
        <button className="btn btn-primary">Add</button>
      </form>
      {notes.map((note)=>{
        return <h3>{note.description}</h3>
      })}
    </>
  );
}

export default App;
