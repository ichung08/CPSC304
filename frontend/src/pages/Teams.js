import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TeamsTable from '../components/TeamsTable';

const Select = styled.select`
  font-size: 1rem;
  padding: 0.5rem;
`;

const StyledH1 = styled.h1`
  text-align: center;
  font-size: 1em;
  margin: 0.5em 0;
  font-weight: bold;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5em

`;

const StyledForm = styled.form`
  text-align: center;
  font-size: 1.3em;
  margin: 0.5em 0;
  font-weight: bold;
`;

const StyledLabel = styled.label`
  margin-left: 1em;
  font-weight: bold;
`;


const StyledInput = styled.input`
  margin: 1em;
  width: 10em;
  height: 2em;
`;

const StyledButton = styled.button`
  font-size: 1em;
  margin: 0.5em;
  background-color: #FFD6E8;
  padding: 0.3rem;
  &:hover {
    box-shadow: 5px 5px 5px #000000;
  }
  &:active {
    background-color: #dea6d5;
  }
`;


const StyledCheckbox = styled.input`
  margin-right: 15px;
  position: relative;
  top: 2px;
  transform: scale(2);
`;


const Teams = ( ) => {
  const [teams, setTeams] = useState([]);
  const [attribute, setAttribute] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/teams/${attribute}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeams(data.data);
        console.log(data.query)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [attribute]);

    const handleChange = event => {
        setAttribute(event.target.value);
    };

    return (
      <>
          <StyledH1 htmlFor="attribute">Select an attribute:</StyledH1>
          <SelectContainer>
              <Select id="attribute" value={attribute} onChange={handleChange}>
                  <option value="">-- Select an attribute --</option>
                  <option value="country">Country</option>
                  <option value="ranking_level">Ranking Level</option>
                  <option value="age">Age</option>
              </Select>
          </SelectContainer>
          <TeamsTable teams={teams} attribute={attribute} />
      </>
  );
};

export default Teams;
