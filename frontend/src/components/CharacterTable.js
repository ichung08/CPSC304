import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
`;

const Th = styled.th`
  background-color: #fab905;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #FDF9ED;
  }
  font-weight: 300;
  font-size: 0.9rem;
`;

const Td = styled.td`
  text-align: left;
  padding: 0.5rem;
  border: 1px solid #ccc;
`;

const CharacterTable = ({ Smash_Character }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Costume</Th>
        </Tr>
      </thead>
      <tbody>
        {Smash_Character.map(Smash_Character => (
          <Tr key={Smash_Character.character_name}>
            <Td>{Smash_Character.character_name}</Td>
            <Td>{Smash_Character.costume}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CharacterTable;
