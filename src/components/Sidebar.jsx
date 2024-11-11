import React from "react";
import "../styles/Sidebar.css";
import plusIcon from "../assets/+icon.png";

const Sidebar = ({
  setNoteBtnClick,
  noteGroups,
  setSelectedNote,
  selectedNote,
  isMobile,
  display,
  setDisplay,
}) => {

  // Handle selecting a note
  const handleSelect = (note) => {
    if (isMobile) {
      setDisplay(true); // Close sidebar on mobile view when a note is selected
    }
    setSelectedNote(note); // Set the selected note
  };

  // Handle click on "Pocket Notes" heading to show home or reset
  const handleHomeClick = () => {
    if (isMobile) {
      setDisplay(true); // Optionally hide sidebar on mobile view
    }
    setSelectedNote({}); // Reset selected note to show home component
  };

  return (
    <div
      className={`sidebar ${isMobile ? "sidebar-mobile" : ""}`} // Simplified mobile class name
      style={{ display: isMobile && display ? "none" : "block" }} // Toggle sidebar visibility
    >
      <div className="sidebar-header">
        {/* Clicking on Pocket Notes resets the selected note */}
        <p className="sidebar-title" onClick={handleHomeClick}>
          Pocket Notes
        </p>
        <img
          src={plusIcon}
          alt="Add"
          onClick={() => setNoteBtnClick(true)}
          className="icon"
        />
      </div>

      <div className="notes-list">
        {noteGroups &&
          noteGroups.map((note, index) => {
            // Get uppercase initials from the note's name
            const firstLetters = note.name
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase()) // Ensure initials are uppercase
              .join(""); // Join initials together

            return (
              <div
                className={`note-item ${note.id === selectedNote.id ? "selected-note" : ""}`}
                key={index}
                onClick={() => handleSelect(note)}
              >
                <div
                  className="note-icon"
                  style={{ backgroundColor: note.color }}
                >
                  {firstLetters}
                </div>
                <p className="note-title">{note.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
