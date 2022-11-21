import alertContext from "./Alertcontext";
import { useState } from "react";
import React from 'react'

function Alertstate(props) {
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
    <alertContext.Provider value={{alert,showAlert}}>
      {props.children}
    </alertContext.Provider>
  )
}

export default Alertstate
