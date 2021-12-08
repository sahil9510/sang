import React, {useState} from 'react';
import './Note.css';
import { useHttpClient } from '../../hooks/http-hook';

const AddNote = ({addNoteHandler}) => {
  const {isLoading, error,sendRequest, clearError }= useHttpClient();
  const [noteText, setNoteText] = useState('');
  const characterLimit =200;

  const changeHandler = (e) => {
      if(characterLimit-e.target.value.length>=0){
        setNoteText(e.target.value);
      }

  };

  const saveHandler = (e) => {
    if (noteText.trim().length > 0) {
      addNoteHandler(noteText);
      setNoteText('');
    }
    // sendRequest('http://localhost:5000/api/')
  };

  return (
    <div className="note add">
      <textarea
        rows="8"
        cols="10"
        placeholder="Add a note..."
        value={noteText}
        onChange={changeHandler}
      ></textarea>
      <div className="note-footer">
        <small>{characterLimit-noteText.length} remaining</small>
        <button className="save" onClick={saveHandler}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
