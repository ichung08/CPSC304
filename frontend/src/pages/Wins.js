import React, { useState, useEffect } from 'react';
import WinsTable from '../components/WinsTable';
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

const Wins = ( ) => {
  const [wins, setWins] = useState([]);
  const [attribute, setAttribute] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/wins/${attribute}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWins(data.data);
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
          <option value="">-- Select a user --</option>
          <option value="country">Country</option>
          <option value="ranking_level">Ranking Level</option>
          <option value="age">Age</option>
        </Select>
      </SelectContainer>
      <WinsTable wins={wins} attribute={attribute} />
      </>
    );
};

export default Wins;
