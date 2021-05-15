import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import NavigationBar from "./components/NavigationBar";
import About from "./components/about/About";

function App() {
  return (
    <div className="App">
        <NavigationBar />
        <Header />
        <About />
    </div>
  );
}

export default App;
