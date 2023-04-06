
import React, { useState, useEffect } from 'react';
import GameTournamentTable from '../components/GameTournamentTable';
import styled, { keyframes } from 'styled-components';

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const GameTournament = () => {
    const [gameTournament, setGameTournament] = useState([]);
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/game_tournament');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setGameTournament(data.data);
          console.log(data.query)
          setRefresh(false)
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      fetchData();
    }, [refresh]);

    function handleClick() {
      setRefresh(true)
    }
    
    
  return (<>
      <Button onClick={handleClick}>Refresh</Button>
      <GameTournamentTable game_tournament={gameTournament} />
    </>
  );
};

export default GameTournament;