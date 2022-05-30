import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'

import AddedNotes from "./AddedNotes";
import { createSpeech } from "../actions/speech";
import Links from "./Links/Links";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

//console.log(mic)

const Speech = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [addedNotes, setAddedNotes] = useState([]);

  const dispatch = useDispatch()
  const profile = localStorage.getItem('profile')
  const user = JSON.parse(profile)
  const userName =`${user?.result?.firstName} ${user?.result?.lastName}`

  useEffect(() => {
    const handleListen = () => {
      if (isListening) {
        mic.start();
        mic.onend = () => {
          //console.log("continue...");
          mic.start();
        };
      } else {
        mic.stop();
        mic.onend = () => {
          //console.log("Stop Mic on Click");
        };
      }
      
      mic.onstart = () => {
        //console.log("Mics on");
      };
      
      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

        setNote(transcript);
        
        mic.onerror = (event) => {
          console.log(event.error);
        };
      };
    };
    handleListen();
  }, [isListening]);

  const handleAddNote = () => {
    setAddedNotes([...addedNotes, note]);    
    setNote("");
  };

  const handleSaveNote = (e) => {
      e.preventDefault()
      const notesToSave = addedNotes.join()
      dispatch(createSpeech({ speech: notesToSave, name: userName }))
      setAddedNotes([])
  }

  return (
    <>
      <Links />
      <div className="container">
        <div className="speechbox">
          <h2 style={{ margin: '10px', padding: '5px' }}>Note recorded</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 18px",
            }}
          >
            <div style={{ height: "100%", margin: "4px", fontWeight:'bold' }}>
              {isListening ? (
                <span className="fade-in-text">is recording</span>
              ) : (
                <span>not recording</span>
              )}
            </div>
            <div>
              <button
                className={note ? "btn" : "disabled"}
                onClick={handleAddNote}
                disabled={!note}
              >
                Add Note
              </button>
              <button
                className="btn"
                style={{ marginLeft: "4px" }}
                onClick={() => setIsListening((prevState) => !prevState)}
              >
                Start/Stop
              </button>
            </div>
          </div>
          <div  style={{ height:'70%' }}>
            { 
              note ? 
              <p className="recordingbox">{note}</p> 
              : 
              <p className="recordingbox">press the button to start recording</p>
            }            
          </div>
        </div>
        <div className="savebox">
          <h2 style={{ margin: '10px', padding: '5px' }}>Notes to save</h2>
              <div className="recordingbox" style={{ height: "78%" }}>
                {addedNotes.map((addedNote) => (
                  <AddedNotes key={addedNote} addedNotes={addedNote} />
                ))}
              </div>
            <form onSubmit={handleSaveNote} >
              <input style={{ display:'none' }} type="text" value={addedNotes} onChange={(e) => setAddedNotes(e.target.value)} />
              <div style={{ margin: "6px" }}>          
                <button
                  type="submit"
                  className={(addedNotes.length === 0 || !profile) ? "disabled" : "btn"}
                  disabled={(addedNotes.length === 0 || !profile) ? true : false}
                  style={{ width: "90px" }}
                >
                  Save
                </button>
              </div>
            </form>
        </div>
      </div>
    </>
  );
};

export default Speech;



  // const notes = useSelector((state) => state.speeches) // state.speech is a reducer

  // console.log(notes);
  // useEffect(() => {
  //   dispatch(getSpeeches())
  // }, [dispatch])