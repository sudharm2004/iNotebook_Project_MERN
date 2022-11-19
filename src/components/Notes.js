import React from 'react'
import noteContext from '../context/notes/Notecontext'
import { useContext, useRef, useState ,useEffect} from 'react'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import {  useNavigate } from 'react-router-dom';



function Notes(props) {
  const ref = useRef(null)
  const context = useContext(noteContext)
  const { notes  ,editNote, getUserData,getAllNotes} = context;
  const navigate=useNavigate();
  useEffect( () => {
    if (localStorage.getItem('token')) {
      try {
        console.log('getallnotes');
        getAllNotes(); 
        getUserData();
      } catch (error) {
        props.showAlert('Server error occurred','danger')
      }
    }
    else
    {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])
  // useEffect(() => {
  //     if (localStorage.getItem('token')) {
  //       try {
          
  //         getAllNotes();
  //       } catch (error) {
  //         props.showAlert('Server error occurred','danger')
  //       }
  //     }
      // else
      // {
      //   navigate('/login')
      // }
      // eslint-disable-next-line
    // }, [])

  const [enote, esetnote] = useState({ eid:"",etitle: "", edescription: "", etag: "" })
  const updateNote = (currentNote) => {
    ref.current.click()
    esetnote({eid:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  };

  const updatNoteBtn=()=>{
    try {
      
      ref.current.click()
      editNote(enote.eid,enote.etitle,enote.edescription,enote.etag);
      props.showAlert('Note Updated Successfully','success')
    } catch (error) {
      props.showAlert('Note Not Updated Successfully','danger')
    }

  }

  const onChangeHandle = (event) => {
    esetnote({ ...enote, [event.target.name]: event.target.value })
  }
  return (
    <>
      <Addnote />
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="card hide">
                <div className="card-body">

                  <h4 className="card-title">Title of the note</h4>
                  <input className="form-control my-3" type="text" placeholder="Title" aria-label="default input example" id="addTitle" name='etitle' onChange={onChangeHandle} value={enote.etitle}/>

                  <h5 className="card-title">Description</h5>

                  <div className="mb-3">
                    <textarea className="form-control" id="addTxt" rows="3" name='edescription' onChange={onChangeHandle} value={enote.edescription}></textarea>
                  </div>
              
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={updatNoteBtn}>Update note</button>
            </div>
          </div>
        </div>
      </div>

      {/* displaying the notes */}
      <h1 className='my-4'>Your Notes</h1>
      <hr />
      <div className="container-fluid row my-2" id="notes">
        { notes.length!==0?
          notes.map((note) => <Noteitem key={note._id} note={note} updateNote={updateNote} updatNoteBtn={updatNoteBtn} showAlert={props.showAlert}/>)
          :
          <strong>No notes to display!!!Add notes to display.</strong>}
      </div>
    </>
  )
}

export default Notes
