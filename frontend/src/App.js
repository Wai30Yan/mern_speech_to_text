import React from 'react';
import './App.css';
import Speech from './components/Speech';
import { Route, Routes } from 'react-router-dom';
import SavedNotes from './components/SavedNotes/SavedNotes';
import NavBar from './components/NavBar'
import Auth from './components/Auth/Auth';
import UpdataNotePage from './components/UpdateNotePage/UpdateNotePage';

function App() {

  // const notes = useSelector((state) => state.speeches) // state.speech is a reducer
  // const dispatch = useDispatch()
  // console.log(notes);
  // useEffect(() => {
  //   dispatch(getSpeeches())
  // }, [dispatch, notes])
  return (
    <>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Speech/>} />
          <Route path="/savednotes" element={<SavedNotes />} />
          <Route path="/:id" element={<UpdataNotePage />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>

    </>
  );
}

export default App;
