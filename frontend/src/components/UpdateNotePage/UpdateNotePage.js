import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSpeech, editSpeech } from '../../actions/speech';
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom';
import Links from '../Links/Links';

const UpdateNotePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const note = useSelector(state => id ? state.speeches.find((p) => p._id === id) : null )

  const [newNote, setNewNote] = useState(note)
  const user = JSON.parse(localStorage.getItem('profile')) 
  
  const handleChange = (e) => {
    e.preventDefault()
    setNewNote(e.target.value)
  }

  const handleEdit = (e) => {
    e.preventDefault()
    dispatch(editSpeech(id, { speech: newNote } ))
  }

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteSpeech(id))
    navigate('/savednotes')
  }

  return (
    <>
      <Links />
      <form onSubmit={handleEdit}>
        <div style={{ height: '90vh' }} >
          { newNote.speech !== "" &&
            <>
              <textarea 
                className='savednote textareaNote' 
                style={{ fontFamily: 'Roboto' }}
                value={newNote.speech}
                onChange={handleChange}
              > 
              </textarea>
            </>
          }
          <div style={{ margin: "6px", display: 'flex', justifyContent: 'space-between', padding: '5px 20px', alignItems: 'center' }}>  
            <div >
              <span style={{ fontWeight: 'bold' }} >Created: </span>        
              <span>{moment(newNote.createdAt).fromNow()}</span>
            </div>
            {
              note.creator !== user?.result?._id ?
              <>
                <span style={{ fontWeight: 'bold' }} >This note was created by {note.name}.</span>
              </> :
              <>
                <div style={{ width: 'auto' }}>
                  <button 
                    onClick={handleDelete}
                    className="btn secondary-btn"
                    style={{ width: "90px" }}
                  >
                    Delete
                  </button>          
                  <button
                    type="submit"
                    className={newNote.speech === note.speech ? "disabled" : "btn"}
                    disabled={newNote.speech === note.speech ? true : false}
                    style={{ width: "90px" }}
                  >
                    Save
                  </button>
                </div>
              </>
            }
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateNotePage;
