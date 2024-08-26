import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import NoteSate from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = ( message, type ) => {
    setAlert({ 
     msg: message,
     type: type
     })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <NoteSate>
      <Router>
        <Navbar />
         <Alert alert={alert} /> 
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/Login" element={<Login showAlert={showAlert}  />} />
            <Route path="/Signup" element={<Signup showAlert={showAlert}   />} />
          </Routes>
        </div>
      </Router>
    </NoteSate>
  );
}

export default App;