const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const dotenv = require("dotenv");
dotenv.config();

//middleware
app.use(cors());
app.use(express.json()); //req.body

//Routes//

//create a note

app.post("/notes", async (req, res) => {
  try {
    const { description } = req.body;
    const newNote = await pool.query(
      "INSERT INTO notes (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newNote.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all notes

app.get("/notes", async (req, res) => {
  try {
    const allNotes = await pool.query("SELECT * FROM notes");
    res.json(allNotes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a note

app.get("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await pool.query("SELECT * FROM notes WHERE note_id = $1", [
      id,
    ]);

    res.json(note.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a note

app.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateNote = await pool.query(
      "UPDATE notes SET description = $1 WHERE note_id = $2",
      [description, id]
    );

    res.json("Note was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a note

app.delete("/notes/:id", async (req, res)=>{
    try {
        const { id } = req.params;
        const deleteNote = await pool.query('DELETE FROM notes WHERE note_id = $1', [id])
        res.json('Note was deleted.')
    } catch (error) {
        console.error(err.message);
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
