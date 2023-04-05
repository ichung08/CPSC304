import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AvgAgeTable from '../components/AvgAgeTable';

const Select = styled.select`
  font-size: 1rem;
  padding: 0.5rem;
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
        <label htmlFor="attribute">Select an attribute:</label>
        <Select id="attribute" value={attribute} onChange={handleChange}>
            <option value="">-- Select a user --</option>
            <option value="country">Country</option>
            <option value="ranking_level">Ranking Level</option>
            <option value="wins">Wins</option>
            <option value="losses">Losses</option>
        </Select>
        <AvgAgeTable avgAge={avgAge} attribute={attribute} />
    </>
  );
};

export default AvgAge;