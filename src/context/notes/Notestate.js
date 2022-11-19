import React from 'react'
import noteContext from './Notecontext'
import { useState } from 'react'


const NoteState=(props)=> {
  const host="http://localhost:5000"
  const [notes, setnotes] = useState([])
  const [user, setuser] = useState({name:'sudharm',email:'sudharmjadhav2004@gmail.com'})

  const getAllNotes=async ()=>{
    localStorage.getItem('token');
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
       "auth-token": localStorage.getItem('token')
      },
    });
    const data=await response.json();
    setnotes(data);
  }

  const getUserData=async ()=>{
    localStorage.getItem('token');
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
       "auth-token": localStorage.getItem('token')
      },
    });
    const data=await response.json();
    localStorage.setItem('user.name',data.user.name)
    localStorage.setItem('user.email',data.user.email)
  }

  const addNote=async (title,description,tag)=>{
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
       "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });

    const note=await response.json()
    setnotes(notes.concat(note))
  }

  const deleteNote=async (id)=>{
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
       "auth-token": localStorage.getItem('token')
      }
    });
    const json=response.json();
    console.log('response.json',json);
    const newNotes=notes.filter((note)=>note._id!==id)
    setnotes(newNotes)
  }

  const editNote=async (id,title,description,tag)=>
  {
    console.log('editnotes parameters>>>',id,title,description,tag)
    //API CALL
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
       "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const json=response.json();
    console.log('response>>>', json)
    let newNotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id===id){
        newNotes[index].title=title;
        newNotes[index].description=description;
        newNotes[index].tag=tag;
        console.log(element)
        break;
      }
    }
    setnotes(newNotes);
  }


    

    
  return (
    <noteContext.Provider value={{notes,addNote,deleteNote,getAllNotes,editNote,getUserData}}>
        {props.children}
    </noteContext.Provider>
  )
}

export default NoteState