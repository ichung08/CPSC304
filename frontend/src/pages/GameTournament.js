
import React, { useState, useEffect } from 'react';
import GameTournamentTable from '../components/GameTournamentTable';

const GameTournament = () => {
    const [gameTournament, setGameTournament] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/game_tournament');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setGameTournament(data.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      fetchData();
    }, []);
    
  return (
    // render your component with the retrieved data
    <GameTournamentTable game_tournament={gameTournament} />
  );
};

export default GameTournament;