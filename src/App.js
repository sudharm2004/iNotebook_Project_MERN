import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useContext } from 'react';
import alertContext from './context/notes/Alertcontext';

function App() {
  const AlertContext=useContext(alertContext)
  const {alert}=AlertContext;
  return (
    <>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signin' element={<Signup />} />
          </Routes>
        </div>
    </>
  );
}

export default App;
