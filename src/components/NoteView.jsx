import React from "react";
import "../styles/NoteView.css";

import NoteHead from "./NoteHead";
import Input from "./Input";

// Complete note view
const NoteView = ({ name, color, id, isMobile, display, setDisplay }) => {
  const [notes, setNotes] = React.useState([]);
  const [groupId, setGroupId] = React.useState("");
  const [newNote, setNewNote] = React.useState({});

  React.useEffect(() => {
    const noteGroups = JSON.parse(localStorage.getItem("noteGroups"));
    const groupIndex = noteGroups.findIndex((group) => group.id === id);
    if (groupIndex === -1) {
      console.error(`Group with ID ${id} not found`);
      return;
    }
    const group = noteGroups[groupIndex];
    setGroupId(group.id);
    setNotes([...group.notes]);
  }, [id, newNote]);

  const handleNewNote = (value) => {
    setNewNote(value);
    setNotes((prevNotes) => [...prevNotes, value]);
  };

  return (
    <div
      className="note-view-container flex justify-start"
      style={{ display: isMobile && !display ? "none" : "" }}
    >
      <NoteHead
        name={name}
        color={color}
        isMobile={isMobile}
        display={display}
        setDisplay={setDisplay}
      />
      {groupId === id && notes.length > 0 ? (
        <div className="notes-container">
          {notes.map((note, index) => (
            <div className="note-view" key={index}>
              <div className="note-content">
                <p className="note-text">{note.content}</p>
              </div>
              <div className="time-container">
                <p className="date">
                  <p className="time">{note.date} &nbsp; .{note.time && note.time.substring(0, 4) + note.time.substring(7, 11)} </p>
                </p>
                
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      <Input id={id} handleNewNote={handleNewNote} />
    </div>
  );
};

export default NoteView;
