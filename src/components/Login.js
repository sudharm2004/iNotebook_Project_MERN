import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';


function Login(props) {
  const navigate=useNavigate();

  const host="http://localhost:5000"
  const onSubmitHandle=async (event)=>{
    event.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json=await response.json();
    
    if(json.success){
      props.showAlert('Logged In successfully','success')
      localStorage.setItem("token",json.authToken)
      navigate('/')
    }
    else{
      props.showAlert(json.errors,'danger')
    }
  }

  const [credentials, setcredentials] = useState({email:"",password:""})

  const onChangeHandle=(event)=>{
      setcredentials({...credentials,[event.target.type]:event.target.value})
  }

  return (
    <>
      <h1>Login to continue with iNoteBook</h1>
      <form className='my-5' onSubmit={onSubmitHandle}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChangeHandle}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" onChange={onChangeHandle}/>
        </div>
        <div  className="form-text" style={{color:'red'}}>First time on iNoteBook ? please <Link  to='/signin'>Sign In</Link> to use the iNoteBook.</div>
        

        <button type="submit" className="btn btn-primary my-2">Submit</button>
      </form>
    </>
  )
}

export default Login