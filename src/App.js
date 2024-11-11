import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import "./styles/App.css";
import Notes from "./components/Notes";
import GroupPopup from "./components/GroupPopup";

function App() {
  const [noteBtnClick, setNoteBtnClick] = useState(false);
  const [noteGroups, setNoteGroups] = useState(
    localStorage.getItem("noteGroups")
      ? JSON.parse(localStorage.getItem("noteGroups"))
      : []
  );
  const [newNoteGroup, setNewNoteGroup] = useState({
    id: "",
    name: "",
    notes: [],
    color: "",
  });
  const [selectedNote, setSelectedNote] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check for window size
    handleResize();

    // Resize event listener to handle screen size changes
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.Fragment>
      <div className="App flex flex-row">
        {/* Sidebar Component */}
        <Sidebar
          display={display}
          setDisplay={setDisplay}
          setNoteBtnClick={setNoteBtnClick}
          noteGroups={noteGroups}
          setSelectedNote={setSelectedNote}
          selectedNote={selectedNote}
          isMobile={isMobile}
        />

        {/* Notes View */}
        <Notes
          display={display}
          setDisplay={setDisplay}
          selectedNote={selectedNote}
          isMobile={isMobile}
          noteBtnClick={noteBtnClick}
        />
      </div>

      {/* Create New Note Group */}
      <GroupPopup
        noteBtnClick={noteBtnClick}
        setNoteBtnClick={setNoteBtnClick}
        noteGroups={noteGroups}
        newNoteGroup={newNoteGroup} 
        setNewNoteGroup={setNewNoteGroup}  
        setNoteGroups={setNoteGroups}
      />
    </React.Fragment>
  );
}

export default App;
