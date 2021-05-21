import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/app"

firebase.initializeApp({
    apiKey: "AIzaSyBNP28c3vsIihTrYVOzkOG_YuXgHGZvbTw",
    authDomain: "ll-bygg.firebaseapp.com",
    projectId: "ll-bygg",
    storageBucket: "ll-bygg.appspot.com",
    messagingSenderId: "1072602321840",
    appId: "1:1072602321840:web:bfb60075079e215666bc75"
})

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
