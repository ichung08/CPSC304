import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AvgAgeTable from '../components/AvgAgeTable';

const StyledH1 = styled.h1`
  font-size: 1em;
  text-align: center;
  margin-top: 1em;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Select = styled.select`
  font-size: 1em;
  padding: 0.5em;
  margin: 0.5em;
  border-radius: 3px;
  border: none;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
`;


const AvgAge = ( ) => {
  const [avgAge, setAvgAge] = useState([]);
  const [attribute, setAttribute] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/avg-age/${attribute}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAvgAge(data.data);
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
                  <option value="wins">Wins</option>
                  <option value="losses">Losses</option>
              </Select>
          </SelectContainer>
          <AvgAgeTable avgAge={avgAge} attribute={attribute} />
      </>
  );
  
};

export default AvgAge;
