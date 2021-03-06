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

  //Update Note and put recent note on top
  function updateNote(text) {
    setNotes((oldNotes) => {
      const newNotesArray = [];

      for (let i = 0; i < notes.length; i++) {
        const oldNote = oldNotes[i];

        if (oldNote.id === currentNoteId) {
          newNotesArray.unshift({ ...oldNote, body: text });
        } else {
          newNotesArray.push(oldNote);
        }
      }
      return newNotesArray;
    });
  }

  //Find current note
  function findCurrentNote() {
    /* loop through notes and find where notes.id === currentid?*/
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  //delete note
  function deleteNote(event, noteId) {
    event.stopPropagation();

    console.log("delete button working", noteId);
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
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
            handleClick={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className=" content-desktop  no-notes ">
          <h1>You have no notes</h1>
          <button className="first-note-button" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
      <div classname="content-mobile ">
        <h1 className="content-mobile no-notes mobile-header">
          Hi there, sorry this app only works on desktop
        </h1>
      </div>
    </main>
  );
};
export default App;
