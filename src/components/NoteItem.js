import React , {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

const NoteItem = ({ note ,updateNote , showAlert}) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    return (
        <div className="col-md-4">
            <div className="card my-3 cardContainer">
                <div className="card-body">
                    <span className='cardText'>
                    <span className="position-absolute badge rounded-pill bg-danger" style={{ right: "0px", top: "0px"}}>
                        {note.tag}
                    </span>
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} </p>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); showAlert("Note Deleted Successfully","success")}}></i>
                    <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>updateNote(note)}></i>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
