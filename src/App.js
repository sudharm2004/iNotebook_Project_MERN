import './App.css';
import noteContext from './context/notes/Notecontext'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState ,useEffect,useContext} from 'react';


function App() {
  const [alert, setAlert] = useState(null)
  
  const showAlert = (message, type) => {
    console.log("show alert triggerred");
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home showAlert={showAlert} />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/login' element={<Login showAlert={showAlert}/>} />
            <Route exact path='/signin' element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </div>
    </>
  );
}

export default App;
