import './App.css';
import React, {useEffect, useState} from 'react';

import Home from './pages/Home'
import Logo from './pages/LogoDisplay'
import SmashCharacters from './pages/SmashCharacters';
import Tournaments from './pages/Tournament';
import GameTournament from './pages/GameTournament';
import PlayerTable from './components/PlayerTable';

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/players', {
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
      <PlayerTable players={players} />
    </>
  );

}

export default App;