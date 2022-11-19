import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {

  const navigate=useNavigate();

  const host="http://localhost:5000"
  const onSubmitHandle=async (event)=>{
    console.log(credentials)
    event.preventDefault();
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
    });
    const json=await response.json();
  
    if(json.success){

      props.showAlert('User Created Successfully','success')
      localStorage.setItem("token",json.authToken)
      navigate('/')

    }
    else{
      props.showAlert(json.errors[0].msg,'danger')
    }
    console.log(json)
  }

  const [credentials, setcredentials] = useState({email:"",password:"",cpassword:"",name:""})

  const onChangeHandle=(event)=>{
      setcredentials({...credentials,[event.target.name]:event.target.value})
      console.log(credentials.name)
    }

  return (
    <>
      <h1>Sign Up to use iNoteBook</h1>
      <form className='my-5' onSubmit={onSubmitHandle}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1"  className="form-label">Email address</label>
          <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChangeHandle} required minLength={5}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
          <input type="text" name="name" className="form-control" id="exampleInputPassword1" onChange={onChangeHandle} required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={onChangeHandle} required minLength={8}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1"  className="form-label">Confirm Password</label>
          <input type="password" name='cpassword' className="form-control" id="exampleInputPassword1" onChange={onChangeHandle} required minLength={8}/>
        </div>

        {credentials.password===credentials.cpassword?
        "":
        <div  className="form-text" style={{color:'red'}}>password and confirm password must be same</div>
      }

        <button type="submit" className="btn btn-primary my-2">Submit</button>
      </form>
    </>
  )
}

export default Signup