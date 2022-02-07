import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpeeches } from '../../actions/speech';
import Links from '../Links/Links';
import SavedNote from './SavedNote/SavedNote';
//import { Link } from 'react-router-dom';

//const note = notes.filter((savedNote) => savedNote._id === notes._id)
const SavedNotes = () => {
  const notes = useSelector((state) => state.speeches) // state.speech is a reducer
  const dispatch = useDispatch()
  console.log(notes);
  useEffect(() => {
    dispatch(getSpeeches())
  }, [dispatch])

  return (
      <>
        <Links />
        <div className='savednoteContainer'>
          {notes.map((note) => (
            <>
              <SavedNote key={note._id} note={note} />
            </>
          ))} 
        </div>
      </>
  );
};

export default SavedNotes;