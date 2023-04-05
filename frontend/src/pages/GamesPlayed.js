import React, { useState, useEffect } from 'react';
import GamesPlayedTable from '../components/GamesPlayedTable';
import styled from 'styled-components';

const Select = styled.select`
  font-size: 1rem;
  padding: 0.5rem;
`;

const GamesPlayed = ( ) => {
  const [gamesPlayed, setGamesPlayed] = useState([]);
  const [username, setUsername] = useState('')
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/games-played/${username}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGamesPlayed(data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [username]);

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
                setPlayers(data.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        fetchData();
    }, []);

    const handleChange = event => {
        setUsername(event.target.value);
    };

  return (
    <>
        <label htmlFor="user">Select a user:</label>
        <Select id="user" value={username} onChange={handleChange}>
            <option value="">-- Select a user --</option>
            {players.map(player => (
                <option key={player.username} value={player.username}>
                    {player.username}
                </option>
            ))}
        </Select>
        <GamesPlayedTable games_played={gamesPlayed} />
    </>
  );
};

export default GamesPlayed;
