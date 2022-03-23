import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";

const App = () => {
  const [notes, setNotes] = useState(
    //Lazy state initialization
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteId, setCurrentNoteId] = useState(
    //if notes at index is valid
    (notes[0] && notes[0].id) || ""
  );

  //Save / Set in Local storage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  //Create a new note
  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "#Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        //if old notes id equals current change/update body
        return oldNote.id === currentNoteId
          ? { ...oldNote, body: text }
          : oldNote;
      })
    );
  }

  //Create a new note
  function findCurrentNote() {
    /* loop through notes and find where notes.id === currentid?*/
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split
          sizes={[15, 85]}
          direction="horizontal"
          className="split"
          gutterSize={1}
        >
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note-button" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
};
export default App;
