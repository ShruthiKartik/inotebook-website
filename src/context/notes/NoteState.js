import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
  let host="http://localhost:5000"

      const [notes,setNotes]=useState([]);

  
      const getNotes=async()=>{
          let response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method: 'GET',
            headers: {
              'auth-token': localStorage.getItem('token')
            }
          })
          const json = await response.json();
          if(json.error) {
              console.log(json.error)
          }
          else {
            setNotes(json);
          }
      }

      const addNote=async(title,description,tag)=>{
        let response = await fetch(`${host}/api/notes/addnote`,{
          method: 'POST',
          headers: {
            'Content-type':'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag})
        })
        const json = await response.json();
        setNotes(notes.concat(json));
      }

      const deleteNote=async(id)=>{
        let response = await fetch(`${host}/api/notes/deletenote/${id}`,{
          method: 'DELETE',
          headers: {
            'Content-type':'application/json',
            'auth-token': localStorage.getItem('token')
          },
  
        })
        const json = await response.json();
        //console.log(json);
          let newNote = notes.filter((noteObj)=> noteObj._id !== id);
          setNotes(newNote);
      }

      const editNote=async(id,title,description,tag)=>{
        let response = await fetch(`${host}/api/notes/updatenote/${id}`,{
          method: 'PUT',
          headers: {
            'Content-type':'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,tag})
  
        })
        const json = await response.json();
        console.log(json);
        
          let newNote = JSON.parse(JSON.stringify(notes));
          for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
              if(element._id === id){
                  newNote[index].title=title;
                  newNote[index].description=description;
                  newNote[index].tag=tag;
                  //console.log(newNote[index])
                  break;
              }
            
          }
          setNotes(newNote);
      }
    
    return (
        <NoteContext.Provider value={{notes,getNotes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;