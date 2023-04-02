import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({showAlert}) => {
    const [credentials,setCredentials] = useState({email:"",password:""});
    const host="http://localhost:5000";
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        let response = await fetch(`${host}/api/auth/login`,{
            method: 'POST',
            headers: {                                                                                         
              'Content-type':'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
    
          })
          const json = await response.json();
          if(json.success){
            localStorage.setItem('token',json.authToken);
            navigate('/');
            showAlert("Logged in Successfully!",'success')
          }
          else {
            showAlert("Invalid Credentials!",'danger')
          }
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name] : e.target.value})
    }

    return (
        <div className='container my-3'>
            <h2>Please Login to continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email}  onChange={onChange} aria-describedby="emailHelp" minLength={5} required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password"  value={credentials.password} onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
