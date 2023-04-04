import './App.css';
import React, {useEffect, useState} from 'react';

import Home from './pages/Home'
import Logo from './pages/LogoDisplay'

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/players', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data:', data);
        setPlayers(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <>
      <Logo />
      <Home />
      <div>{players.map(player => (
        <div key={player.username}>
          <p>Username: {player.username}</p>
          <p>Ranking: {player.ranking}</p>
          <p>Wins: {player.wins}</p>
          <p>Losses: {player.losses}</p>
        </div>
      ))}</div>
    </>
  );

}

export default App;