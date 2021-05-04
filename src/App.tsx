import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="App">
        <NavigationBar />
        <Header />
    </div>
  );
}

export default App;
