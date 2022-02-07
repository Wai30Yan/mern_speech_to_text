import React from 'react';
import { Link } from 'react-router-dom';

const SavedNote = ({note}) => {
  //console.log(note);
  return (
    <>
      <Link to={`/${note._id}`} style={{ textDecoration: 'none' }} >
        <div className='savednote'>{note.speech}</div>
      </Link>
    </>
  )
};

export default SavedNote;
