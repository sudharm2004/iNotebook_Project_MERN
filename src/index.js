import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import NoteState from './context/notes/Notestate';
import Alertstate from './context/notes/Alertstate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <NoteState>
        <Alertstate>
          <App />
        </Alertstate>
      </NoteState>
    </React.StrictMode>
  </BrowserRouter>
);

