import React from 'react'
import { useContext } from 'react';
import alertContext from '../context/notes/Alertcontext';

function Alert(props) {
    const AlertContext=useContext(alertContext)
    const {alert}=AlertContext;
    function capitalize(word){
        if(word==='danger')word='error'
        word=word.toLowerCase();
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return (
        <div style={{height:'50px'}}>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalize(alert.type)} </strong>{alert.msg} 
        </div>}
        </div>
    )
}

export default Alert