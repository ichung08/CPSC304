import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EveryGameTable from '../components/EveryGameTable';


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
  margin-bottom: 0.5em
`;

const Select = styled.select`
  font-size: 1em;
  padding: 0.5em;
  margin: 0.5em;
  border-radius: 3px;
  border: none;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
`;


const StyledInput = styled.input`
  margin: 1em;
  width: 10em;
  height: 2em;
`;

const StyledH1 = styled.h1`
  text-align: center;
  font-size: 1em;
  margin: 0.5em 0;
  font-weight: bold;
`;

const EveryGame = ( ) => {
  const [everyGame, setEveryGame] = useState([]);
  const [tournamentId, setTournamentId] = useState("");
  const [tournament, setTournament] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/played-every-game/${tournamentId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEveryGame(data.data);
        console.log(data.query)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [tournamentId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tournament');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data:', data);
        // console.log('Query:', data.query)
        setTournament(data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    fetchData();
  }, []);

    const handleChange = event => {
        setTournamentId(event.target.value);
    };

    return (
      <>
        <StyledH1 htmlFor="tournamentId">Select a Tournament:</StyledH1>
        <SelectContainer>
        <Select id="tournamentId" value={tournamentId} onChange={handleChange}>
          <option value="">-- Select a tournament --</option>
          {tournament.map(tournament => (
              <option key={tournament.tournament_id} value={tournament.tournament_id}>
                {tournament.tournament_id}
              </option>
            ))}
        </Select>
      </SelectContainer>
      <EveryGameTable everyGame={everyGame} />
      </>
    );
};

export default EveryGame;
