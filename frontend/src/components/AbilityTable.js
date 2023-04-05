import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

const Th = styled.th`
  background-color: #bef0bd;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 0.7rem;
  &:hover {
    text-shadow: 3px 3px #ccc;
  }
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #FDF9ED;
  }
  &:nth-child(odd) {
    background-color: #ffffff;
  }
  font-weight: 300;
  font-size: 0.9rem;
  &:hover {
    background-color: #b0d4b0;
  }
`;

const Td = styled.td`
  text-align: left;
  padding: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1.2rem;
`;


const AbilityTable = ({ ability }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Character Name</Th>
          <Th>Ultimate Attack</Th>
          <Th>Up Attack</Th>
          <Th>Neutral Attack</Th>
          <Th>Down Attack</Th>
        </Tr>
      </thead>
      <tbody>
        {ability.map(ability => (
          <Tr key={`${ability.character_name}-${ability.ultimate_attack}`}>
            <Td>{ability.character_name}</Td>
            <Td>{ability.ultimate_attack}</Td>
            <Td>{ability.up_attack}</Td>
            <Td>{ability.neutral_attack}</Td>
            <Td>{ability.down_attack}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AbilityTable;
