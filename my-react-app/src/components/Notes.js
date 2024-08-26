import noteContext from "../context/notes/NoteContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { note, getNotes, editNote } = context; // fetch All notes
  
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNotes();
   

    }
   else{
    navigate("/login");

   }
    // eslint-disable-next-line
  }, []);

  const [notes, setNotes] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    setNotes({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag }); // Set the current note data in the modal
    ref.current.click();
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(notes.id, notes.etitle, notes.edescription, notes.etag);
    refClose.current.click();
    // Add any additional logic for updating the note here
  };

  const onChange = (e) => { 
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  return (
    <>
      <AddNote />

      {/* Hidden button to trigger the modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={notes.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={notes.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={notes.etag}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={notes.edescription.length <  5 || notes.etitle.length  < 5} onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {note.length === 0 && 'No notes to display'}

        </div>
      
        {note.map((notes) => {
          return (
            <Noteitem key={notes._id} notes={notes} updateNote={updateNote} />
          ); //passing the props
        })}
      </div>
    </>
  );
  
};

export default Notes;