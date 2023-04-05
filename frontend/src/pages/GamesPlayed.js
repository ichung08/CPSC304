import React, { useState, useEffect } from 'react';
import GamesPlayedTable from '../components/GamesPlayedTable';
import styled from 'styled-components';

const StyledLabel = styled.label`
  font-size: 1.3em;
  text-align: center;
  display: block;
  margin-bottom: 0.5em;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5em;
`;


const Select = styled.select`
  font-size: 1em;
  padding: 0.5em;
  margin: 0.5em;
  border-radius: 3px;
  border: none;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
`;

const StyledH1 = styled.h1`
  text-align: center;
  font-size: 1em;
  margin: 0.5em 0;
  font-weight: bold;
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
        console.log(data.query)
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
        <StyledH1 htmlFor="user">Select a user:</StyledH1>
        <SelectContainer>
          <Select id="user" value={username} onChange={handleChange}>
            <option value=""> -- Select a user --</option>
            {players.map(player => (
              <option key={player.username} value={player.username}>
                {player.username}
              </option>
            ))}
          </Select>
        </SelectContainer>
        <GamesPlayedTable games_played={gamesPlayed} />
      </>
    );
    
};

export default GamesPlayed;
