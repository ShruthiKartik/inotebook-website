import React from 'react'
import AddNote from './AddNote';
import Notes from './Notes';



const Home = ({showAlert}) => {
    return (
        <div>
             <AddNote showAlert={showAlert}/>
            <Notes showAlert={showAlert} />
        </div>
    )
}

export default Home
