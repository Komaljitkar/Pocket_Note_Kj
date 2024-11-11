import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/GroupPopup.css";

const colorOptions = [
  { color: "var(--notes-color-1)", name: "Color 1" },
  { color: "var(--notes-color-2)", name: "Color 2" },
  { color: "var(--notes-color-3)", name: "Color 3" },
  { color: "var(--notes-color-4)", name: "Color 4" },
  { color: "var(--notes-color-5)", name: "Color 5" },
  { color: "var(--notes-color-6)", name: "Color 6" },
];

const GroupPopup = ({
  noteBtnClick,
  noteGroups,
  setNewNoteGroup,
  setNoteBtnClick,
  setNoteGroups,
}) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const modalRef = useRef(null);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleCreateGroup = () => {
    const newGroup = {
      id: Math.floor(Math.random() * 1000),
      name: groupName,
      color: selectedColor,
      notes: [],
    };
    setNewNoteGroup([...noteGroups, newGroup]);
    localStorage.setItem(
      "noteGroups",
      JSON.stringify([...noteGroups, newGroup])
    );
    setGroupName("");
    setSelectedColor("");
    setNoteBtnClick(false);
    setNoteGroups(JSON.parse(localStorage.getItem("noteGroups")));
  };

  // Memoized handleOutsideClick to avoid re-creating the function on each render
  const handleOutsideClick = useCallback(
    (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setNoteBtnClick(false);
      }
    },
    [setNoteBtnClick]
  );

  useEffect(() => {
    if (noteBtnClick) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [noteBtnClick, handleOutsideClick]);

  // Disable Create button if group name or color is not selected
  const isCreateDisabled = groupName.trim() === "" || selectedColor === "";

  const displayContainer = noteBtnClick ? "flex" : "none";

  return (
    <div className="container-body" style={{ display: displayContainer }}>
      <div className="create-note-container flex" ref={modalRef}>
        <p className="create-note-title">Create New Group</p>

        <div className="create-note-input-container flex flex-row justify-start">
          <label htmlFor="name" className="label">
            Group Name
          </label>
          <input
            type="text"
            name="name"
            className="create-note-input placeholder"
            placeholder="Enter group name"
            value={groupName}
            onChange={handleGroupNameChange}
          />
        </div>

        <div className="create-note-input-container flex flex-row justify-start">
          <label htmlFor="color" className="label">
            Choose Color
          </label>
          <div className="colors flex flex-row">
            {colorOptions.map(({ color, name }) => (
              <div
                key={color}
                className={`circle color ${
                  selectedColor === color ? "selected" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
              ></div>
            ))}
          </div>
        </div>

        <button
          className="create-btn"
          onClick={handleCreateGroup}
          disabled={isCreateDisabled}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default GroupPopup;
