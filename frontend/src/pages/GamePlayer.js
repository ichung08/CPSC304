
import React, { useState, useEffect } from 'react';
import GamePlayerTable from '../components/GamePlayerTable';

const GamePlayer = () => {
    const [gamePlayer, setGamePlayer] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/game_player');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          // console.log('Data:', data);
          // console.log('Query:', data.query)
          setGamePlayer(data.data);
          setRefresh(false)
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      fetchData();
    }, [refresh]);
    
  return (
    // render your component with the retrieved data
    <GamePlayerTable game_player={gamePlayer} />
  );
};

export default GamePlayer;