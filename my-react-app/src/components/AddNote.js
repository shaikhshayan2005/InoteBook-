
import noteContext from '../context/notes/NoteContext';
import React, { useContext ,useState} from 'react';

const AddNote = () => {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [notes, setnotes] = useState({title :"",description : "",tag : "default"});  //usestate hook
    const handleClick=(e)=>{
      e.preventDefault();
      addNote(notes.title,notes.description,notes.tag);
      setnotes({title : "",description : "",tag : ""});

    }
    const onChange=(e)=>{ //event e
      setnotes({...notes,[e.target.name]: e.target.value}) //extra properties should be add or overwrite

    }
  return (
    
    <div>
      <div className="container" my-3>
        <h2 className="my-4">Add Note</h2>
        <form className="my-3">
          <div class="mb-3">
            <label htmlFor="title" class="form-label">
              title
            </label>
            <input type="text" 
            className="form-control"
             id="title"  
             name="title" 
             aria-describedby="emailHelp"
             value={notes.title}
              onChange={onChange} 
              minLength={5}
             required/>
          </div>
          <div class="mb-3">
            <label htmlFor="description" class="form-label">
              description
            </label>
            <input
              type="text"
              class="form-control"
              id="description"
              name="description"
              value={notes.description}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div class="mb-3">
            <label htmlFor="tag" class="form-label">
              Tag
            </label>
            <input
              type="text"
              class="form-control"
              id="tag"
              name="tag"
              value={notes.tag}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          
          <button disabled={notes.description.length <  5 || notes.title.length  < 5} type="submit" class="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
