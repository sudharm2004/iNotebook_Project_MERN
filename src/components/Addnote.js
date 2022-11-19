import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/Notecontext'
import Notes from './Notes';

function Addnote(props) {
    const context = useContext(noteContext)
    const {  addNote } = context;

    const [note, setnote] = useState({title:"",description:"",tag:""})

    const handleOnClick=()=>{
      try {
        addNote(note.title,note.description,note.tag);
        document.getElementById('addTitle').value=''
        document.getElementById('addTxt').value=''
        setnote({title:"",description:"",tag:""})
        props.showAlert("Note added successfully","success")
      } catch (error) {
        props.showAlert("Note not added successfully",'danger')
      }
    }
    const onChangeHandle=(event)=>{
        setnote({...note,[event.target.name]:event.target.value})
        console.log(note)
    }
  return (
    <>
      <h1 className="my-3">Welcome To iNoteBook</h1>
        <div className="card hide">
            <div className="card-body">

                <h4 className="card-title">Title of the note</h4>
                <input className="form-control my-3" type="text" placeholder="Title" aria-label="default input example" id="addTitle" name='title' onChange={onChangeHandle} />
                {note.title.length<3?'*Enter at least 3 characters':""}

                <h5 className="card-title my-1">ADD A NOTE</h5>

                <div className="mb-3">
                    <textarea className="form-control" id="addTxt" rows="3" name='description' onChange={onChangeHandle} ></textarea>
                    {note.description.length<5?'*Enter at least 5 characters':""}
                </div>
                <button  id="addBtn" className="btn btn-primary my-1" onClick={handleOnClick} disabled={note.title.length<3||note.description.length<5}>Add Notes</button>
            </div>
        </div>
    </>
  )
}

export default Addnote
