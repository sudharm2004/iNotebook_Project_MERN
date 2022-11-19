import React ,{useContext}from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
// import noteContext from '../context/notes/Notecontext';

const Navbar = () => {
    const navigate=useNavigate();
    
        document.body.addEventListener("click",e=>{
            const isDropDownButton=e.target.matches("[data-dropdown-button]")
            if(!isDropDownButton && e.target.closest("[data-dropdown]") !== null)
                return
                
            
            let currentDropdown;
            if(isDropDownButton){
                currentDropdown=e.target.closest('[data-dropdown]')
                currentDropdown.classList.add('active')

            }

            document.querySelectorAll('[data-dropdown].active').forEach(dropdown=>{
                if(dropdown===currentDropdown)return
                dropdown.classList.remove('active')
            })
        })
    
    let location=useLocation();
    const handleLogOut=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user.name');
        localStorage.removeItem('user.email');
      navigate('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                             <div className='mx-3 ' id="dropdown" data-dropdown>

                                <a className="fa-solid fa-user fa-2xl"  style={{color:'white',cursor:'pointer'}} data-dropdown-button ></a>

                                <div style={{color:'black'}} id='dropdown-menu'>
                                    <h4>{localStorage.getItem('user.name')}</h4>
                                    <hr />
                                    <strong>{localStorage.getItem('user.email')}
                                        </strong>
                                </div>
                            </div>
                    <Link className="navbar-brand" to="#">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/" ? 'active':''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about" ? 'active':''}`} aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        { localStorage.getItem('token') ?
                        <>
                        <form className="d-flex align-center" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button   className="btn btn-primary mx-1" onClick={handleLogOut} >Log out</button>
                        </form>
                        </>
                        :
                         <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <Link to='/login'  className="btn btn-primary mx-1"  >Login</Link>
                            <Link to='/signin' className="btn btn-primary mx-1" >Sign</Link>
                        </form>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
