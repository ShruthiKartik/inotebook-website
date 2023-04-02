import React from 'react'

const About = () => {
  return (
    <div className="container">
      <h1 className='text-center my-3'>Welcome to iNoteBook!</h1>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              About Us
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Welcome to our Site!</strong> Do you also keep procastinating your work and feel helpless to complete all your pending tasks?  Well ! No worries :)))  iNotebook Website will help you to complete all your works within deadlines. Hurray! :)))
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Features of our Website
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <strong>Here you can manage your notes in an efficient way. </strong>
              Our website gives you a personalised todo list . Your notes are secured and can be seen only by you when logged in to our website. So, you can prepare your own to-do lists and modify it as and when required. You can delete your notes when you finish your tasks. Also, you can add your own tags according to your needs. So, start preparing your to-do lists and complete all your pending works. All the best! 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
