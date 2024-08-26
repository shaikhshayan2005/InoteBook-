import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
import { useEffect } from 'react'

const About = () => {
  const a = useContext(noteContext)
  useEffect(() => {
    
      a.update();
  
  }, []);
  return (
    <div>
      This is About{a.state.name}and he is in class{a.state.class}
    </div>
  )
}

export default About
