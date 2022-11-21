import React,{useContext} from 'react'
import alertContext from '../context/notes/Alertcontext';
import noteContext from '../context/notes/Notecontext'

function Noteitem(props) {
    const {note,updateNote}=props;
    const context = useContext(noteContext)
    const AlertContext=useContext(alertContext)
    const {showAlert}=AlertContext;
  const {  deleteNote } = context;
    const mouseOut=(event)=>
    {
        event.target.classList.remove('fa-solid')
        event.target.classList.add('fa-regular')
    }
    const mouseOver=(event)=>
    {
        event.target.classList.remove('fa-regular')
        event.target.classList.add('fa-solid')
    }
    return (
        <>
        <div className="notesCard my-2 mx-2 card " style={{"width":"18rem"}} >
            <div className="card-body">
                <div>
                    <h4 className="card-title noteTitle" >{note.title}</h4>
                </div>
                <hr/>
                    <p className="card-text">{note.description}</p>
                    {/* <button id="${index}" className="btn btn-primary">Delete Note</button> */}
                    <div className='d-flex justify-content-between '>
                        <i className="btn  delete-btn fa-solid fa-trash fa-lg"  onClick={()=>{deleteNote(note._id);showAlert('note deleted successfully','success')}}></i>
                        <i className="btn edit-btn fa-regular fa-pen-to-square fa-lg" onMouseOver={mouseOver} onMouseOut={mouseOut} onClick={()=>{updateNote(note)}}></i>
                    </div>
            </div>
        </div>
        </>
    )
}

export default Noteitem