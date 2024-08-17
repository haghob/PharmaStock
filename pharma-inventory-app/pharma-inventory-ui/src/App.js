import './App.css';
import Inventory from './components/Inventory';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pharma Inventory</h1>
      </header>
      <main>
        <Inventory />
      </main>
    </div>
  );
}

export default App;