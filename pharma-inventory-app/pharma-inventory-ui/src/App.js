import React from 'react';
import Inventory from './components/Inventory';
import './App.css';
import logo from './logo.png'; 
import backgroundImage from './photo.jpg'; 

function App() {
  return (
  
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>PharmaStock</h1>
        </div>
      </header>
      <main>
        <Inventory />
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 PharmaStock. Tous droits réservés.</p>
      </footer>
    </div>
  
  );
}

export default App;
