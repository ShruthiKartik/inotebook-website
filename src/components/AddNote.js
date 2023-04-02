import React , {useContext, useState} from 'react'
import NoteContext from '../context/notes/NoteContext'


const AddNote = ({showAlert}) => {
    const context = useContext(NoteContext);
    const {addNote} =context;
    const [noteObj,setNoteObj] = useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(noteObj.title,noteObj.description,noteObj.tag)
        setNoteObj({title:"",description:"",tag:""})
        showAlert("Note Added Successfully!","success")
    }

    const onChange=(e)=>{
        setNoteObj({...noteObj,[e.target.name] : e.target.value})
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add Your Notes Here!</h2>
                <form >
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={noteObj.title} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={noteObj.description} onChange={onChange}/>
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={noteObj.tag} onChange={onChange}/>
                    </div>
                    <button disabled={noteObj.title.length<5 || noteObj.description.length<5 || noteObj.tag.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
