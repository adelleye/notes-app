import React from "react";

import { FcEmptyTrash } from "react-icons/fc";
const Sidebar = (props) => {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <p className="text-snippet">
          {
            //Get the first line of the note
            note.body.split(/\r?\n/)[0]
          }
        </p>
        <button
          className="delete-btn"
          // Your onClick event handler here
          onClick={(event) => props.handleClick(event, note.id)}
        >
          <FcEmptyTrash className="trash-icon" />
        </button>
      </div>
    </div>
  ));

  return (
    <section className="content-desktop pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
};
export default Sidebar;
