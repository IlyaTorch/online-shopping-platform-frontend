import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';


function App() {
  const [shops, setShops] = useState([])
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/shops/?format=json"
    }).then(response => setShops(response.data))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <ul>
          {shops.map(shop => (
              <li key={shop.id}>{shop.title}</li>
          ))}
        </ul>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
