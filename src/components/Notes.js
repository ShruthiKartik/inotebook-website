import React, { useContext, useEffect, useRef , useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = ({showAlert}) => {
    const context = useContext(NoteContext);
    const { notes, getNotes , editNote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){     
            getNotes();
        }
        else {
            navigate('/login')
        }
    }, [])

    const [noteObj,setNoteObj] = useState({id:"" ,etitle:"",edescription:"",etag:""})

    const handleClick=()=>{
        editNote(noteObj.id,noteObj.etitle,noteObj.edescription,noteObj.etag);
        refClose.current.click();
        showAlert("Note Updated Successfully","success")
    }

    const onChange=(e)=>{
        setNoteObj({...noteObj,[e.target.name] : e.target.value})
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNoteObj({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }
    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={noteObj.etitle} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={noteObj.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3 ">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={noteObj.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={noteObj.etitle.length<5 || noteObj.edescription.length<5 || noteObj.etag.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-1">{notes.length === 0 && "No Notes to display"}</div>
                { notes.map((noteObj) => {
                    return <NoteItem note={noteObj} key={noteObj._id} updateNote={updateNote} showAlert={showAlert}/>
                })}
            </div>
        </>

    )
}

export default Notes
